from pyscript import document, when

from lib.cantus import CantusGenerator
from lib.checks import checklist
from jinja2 import Template

from typing import Union

CHECKS_TEMPLATE="""
<table class="table w-50">
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

@when("click", "#generate")
def generate_cantus(event) :

    size_input = document.querySelector("#size-input")
    obj = CantusGenerator(int(size_input.value))

    method_rb = document.getElementById("method-good")

    method_once : bool = not method_rb.checked

    print(f"method_once = {method_once}")

    print(f"size = {obj.size}")

    if method_once :
        obj.generate_v1()
        cantus = obj.notes
    else :
        cantus = obj.generate()

    output_div = document.querySelector("#output")
    output_div.innerText = str(cantus)

    def reporter(name : str, status : bool, msg : Union[str, None]) -> None :
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
        c(reporter).check(cantus)



def id_name(input : str) -> str :
    return input.replace("_", "-")

def create_checks() -> None :
    checks = [id_name(c.name()) for c in checklist()]

    print("Hello world")

    html = Template(CHECKS_TEMPLATE).render(checks=checks)

    div = document.querySelector("#checks")
    div.innerHTML = html

create_checks()