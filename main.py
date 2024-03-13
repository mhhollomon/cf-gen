from dataclasses import dataclass, field
from io import BytesIO
from pyscript import when, window
from js import Blob, document, Object

from lib.cantus import CantusGenerator
from lib.checks import checklist
from jinja2 import Template
from midiutil import MIDIFile

from pyodide.ffi import to_js, create_proxy

import asyncio

from typing import List, Tuple

CHECKS_TEMPLATE="""
<table class="table">
<tr>
    <th>Status</th>
    <th>Check</th>
    <th>Message</th>
</tr>
{% for check in checks %}
<tr id="{{check}}">
    <td><span class="material-symbols-outlined">
indeterminate_check_box
</span></td>
    <td>{{check}}</td>
    <td></td>
</tr>
{% endfor %}
</table>
"""

NOTE_BOX_TEMPLATE="""
<div class="d-inline-block note-box {{klass}} border-3 border-dark" style="width:{{box_width}}px; left:{{left}}px;">{{note}}</div>
"""

NOTE_TEMPLATE="""
<div class="position-absolute" style="bottom:{{y_pos}}px; left:{{x_pos}}px;">
    <span class="noto-music-regular">{{symbol}}</div>
"""

@dataclass
class GLOBALS :
    cantus : List[int] = field(default_factory=list)
    midi_notes : Tuple = (0, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76)
    y_offsets : Tuple = (-9, 4, 14, 24, 34, 44, 54, 64, 74, 84)


G : GLOBALS = GLOBALS()

background_tasks : set = set()


#=================================================

async def download_to_file(buf, filename : str, content_type : str ) :

    buf.seek(0)
    content = to_js(buf.read())
    #a = document.createElement('a')
    blob = Blob.new([content], {type: content_type})
    opts = Object.fromEntries(to_js(
{
        "startIn" : "downloads",
        "suggestedName" : filename,
        "types" : [
            { "accept" : { content_type : [".mid", ".midi"]}}
        ]
        }
    ))

    fileHandle = await window.showSaveFilePicker(opts)
    file = await fileHandle.createWritable()
    await file.write(blob)
    await file.close()


def fill_staff(cantus : List[int]) -> None :
    current_pos : int = -1

    container = document.getElementById("spacer-line")

    # use a percentage of the width of our parent
    # the complication is to round to single decimal place
    width : float = float(int(1000.0/(len(cantus)+1))) / 10.0
    
    # -24 is padding added by bootstrap
    pixel_width : int = int((container.offsetWidth-24) * ( width / 100.0))
    ledger_box_width : int = 50

    print(f"width = {width}")
    print(f"pixel_width = {pixel_width}")
    print(f"ledger_box_width = {ledger_box_width}")

    HTML : str = ''

    for note in cantus :
        current_pos += 1
        note_html : str = ""
        klass : str  = ""

        last_note : bool = current_pos == len(cantus) - 1

        # semibreve
        symbol : str = "&#x1D15D;" if not last_note else "&#x1D15C;"

        if note > 0 :
            # this line is full of magic derived by trial and error
            y_pos : float = G.y_offsets[note-1]
            x_pos : float = 6 if not last_note else 0
            note_html = Template(NOTE_TEMPLATE).render(note=note, y_pos=y_pos, x_pos=x_pos, symbol=symbol)
            if note == 1 :
                klass = "border-top"

        # The boxes are positioned relative to where they would be "normally".
        # Since each is (ledger_box_width) wide, each
        # would normally start lbw*pos over. But we want them spaced pixel_width
        # apart.
        left : int = int(pixel_width * current_pos) - int(ledger_box_width * current_pos) + int(pixel_width/1.1)

        HTML += Template(NOTE_BOX_TEMPLATE).render(
            box_width=ledger_box_width, left=left, 
            note=note_html, klass=klass)

    container.innerHTML = HTML



@when("click", "#midi")
def gen_midi_handler() -> None :
    task = asyncio.create_task(generate_midi())
    background_tasks.add(task)
    task.add_done_callback(background_tasks.discard)

async def generate_midi() -> None :
    print("Generating midi")

    track = 0
    channel = 0
    time = 0 # In beats
    duration = 4 # In beats
    tempo = 120 # In BPM
    volume = 100 # 0-127, as per the MIDI standard
    midi = MIDIFile(1) # One track, defaults to format 1 (tempo track
    # automatically created)
    midi.addTempo(track,time, tempo)
    for note in G.cantus:
        midi.addNote(track, channel, G.midi_notes[note], time, duration, volume)
        time = time + 4
    bytefile = BytesIO()
    midi.writeFile(bytefile)

    await download_to_file(
        bytefile, "cantus_firmus.mid", "audio/midi")
    

@when("click", "#generate")
def generate_cantus(event) :

    size_input = document.querySelector("#size-input")
    span_input = document.getElementById("span-input")

    span_value : str = span_input.value
    span : None|int = None
    if span_value != "Random" :
        span = int(span_value)

    obj = CantusGenerator(int(size_input.value), span)

    method_rb = document.getElementById("method-good")

    method_once : bool = not method_rb.checked

    print(f"method_once = {method_once}")

    print(f"size = {obj.size}")

    if method_once :
        obj.generate_v1()
        G.cantus = obj.notes
    else :
        G.cantus = obj.generate()

    output_div = document.querySelector("#output")
    output_div.innerText = str(G.cantus)

    def reporter(name : str, status : bool, msg : str|None) -> None :
        id = id_name(name)

        elem = document.getElementById(id)

        status_elem = elem.firstElementChild
        msg_elem = status_elem.nextElementSibling.nextElementSibling

        if status :
            status_elem.style.backgroundColor = '#33FF33'
            status_elem.innerHTML="""
                <span class="material-symbols-outlined">
                check_box
                </span>"""
            msg_elem.innerText = ''
            
            
        else :
            status_elem.style.backgroundColor = '#FF3333'
            status_elem.innerHTML="""<span class="material-symbols-outlined text-red">
                disabled_by_default
                </span>
                """
            if msg is not None :
                msg_elem.innerText = msg
            
            
    for c in checklist() :
        c(reporter).check(G.cantus)

    fill_staff(G.cantus)

    enable_midi()


def id_name(input : str) -> str :
    return input.replace("_", "-")

def create_checks() -> None :
    checks = [id_name(c.name()) for c in checklist()]

    print("Creating checks")

    html = Template(CHECKS_TEMPLATE).render(checks=checks)

    div = document.querySelector("#checks")
    div.innerHTML = html

def enable_midi() :
    print("setting midi button")
    elem = document.getElementById("midi")
    elem.disabled = len(G.cantus) == 0

def _window_resize(e) -> None :
    print ("window resize fired")
    if len(G.cantus) > 0 :
        fill_staff(G.cantus)

def main() -> None :
    create_checks()

    enable_midi()

    window_resize = create_proxy(_window_resize)

    window.addEventListener("resize", window_resize )

###############
main()