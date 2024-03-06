import arrr
from pyscript import document

from lib.cantus import CantusGenerator


def generate_cantus(event) :
    obj = CantusGenerator(10)

    cantus = obj.generate()

    output_div = document.querySelector("#output")
    output_div.innerText = str(cantus)

def translate_english(event):
    input_text = document.querySelector("#english")
    english = input_text.value
    output_div = document.querySelector("#output")
    output_div.innerText = arrr.translate(english)