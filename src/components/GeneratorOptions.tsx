
import { Button, Form, FloatingLabel } from 'solid-bootstrap';

import {createSignal} from 'solid-js';

export default function GeneratorOptions({generate} : { generate : CallableFunction}) {
    let [cantusSize, setCantusSize] = createSignal(10);
    let [highest, setHighest] = createSignal("Random");

    function doClick(_ : any): void {
        generate(cantusSize, highest);
    }

    function doSizeChange(event : any) : void {
        setCantusSize(event.target.value);
    }

    function doHighestChange(event : any) : void {
        setHighest(event.target.value)

    }

    return (
    <>
        <div class="row m-3">
            <div class="col-12">

                <Button type="button" class="btn btn-primary" id="generate"
                    onClick={doClick}>Generate</Button>

                <div class="d-inline-block align-middle mx-3">
                    <FloatingLabel label="Cantus Size" >
                    <Form.Control type="number" name="size" min="8" max="16" 
                            onChange={doSizeChange} value={cantusSize()} id="size-input" />
                    </FloatingLabel>
                </div>

                <div class="d-inline-block align-middle mx-3">
                    <FloatingLabel label="Highest Note" >
                    <Form.Select id="span-input" onChange={doHighestChange} 
                            name="select-input">
                        <option value="Random">Random</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </Form.Select>
                    </FloatingLabel>
                </div>

            </div> 
        </div>


        <div class="row">
            <Form class="col-3">
                <Form.Group>
                    <Form.Check type="radio" id="method-good" 
                        label="Until All Checks Pass" name="method" value="good" checked />
                    <Form.Check type="radio" id="method-once" 
                        label="Try Once" name="method" value="once"/>
                </Form.Group>
            </Form>

        </div>

        <div class="row mt-3 border-top">
            <div class="col-3 mt-3">
            <button type="button" class="btn btn-primary" id="midi">Generate Midi</button>
            </div>
      </div>

    </>
    );
}
