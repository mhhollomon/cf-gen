import arrr
from pyscript import document

from lib.cantus import CantusGenerator


def generate_cantus(event) :

    size_input = document.querySelector("#size_input")
    obj = CantusGenerator(int(size_input.value))

    print(f"size = {obj.size}")

    cantus = obj.generate()

    output_div = document.querySelector("#output")
    output_div.innerText = str(cantus)

def translate_english(event):
    input_text = document.querySelector("#english")
    english = input_text.value
    output_div = document.querySelector("#output")
    output_div.innerText = arrr.translate(english)