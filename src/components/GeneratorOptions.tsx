import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';

export default function GeneratorOptions({generate} : { generate : CallableFunction}) {
    let [cantusSize, setCantusSize] = useState(10);
    let [highest, setHighest] = useState("Random");

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
        <div className="row m-3">
            <div className="col-12">

                <Button type="button" className="btn btn-primary" id="generate"
                    onClick={doClick}>Generate</Button>

                <div className="d-inline-block align-middle mx-3">
                    <FloatingLabel label="Cantus Size" >
                    <Form.Control type="number" name="size" min="8" max="16" 
                            onChange={doSizeChange} value={cantusSize} id="size-input" />
                    </FloatingLabel>
                </div>

                <div className="d-inline-block align-middle mx-3">
                    <FloatingLabel label="Highest Note" >
                    <Form.Select id="span-input" onChange={doHighestChange} 
                            name="select-input">
                        <option key="0" value="Random">Random</option>
                        <option key="5" value="5">5</option>
                        <option key="6" value="6">6</option>
                        <option key="8" value="8">8</option>
                        <option key="10" value="10">10</option>
                    </Form.Select>
                    </FloatingLabel>
                </div>

            </div> 
        </div>


        <div className="row">
            <Form className="col-3">
                <Form.Group>
                    <Form.Check type="radio" id="method-good" 
                        label="Until All Checks Pass" name="method" value="good" checked />
                    <Form.Check type="radio" id="method-once" 
                        label="Try Once" name="method" value="once"/>
                </Form.Group>
            </Form>

        </div>

        <div className="row mt-3 border-top">
            <div className="col-3 mt-3">
            <button type="button" className="btn btn-primary" id="midi">Generate Midi</button>
            </div>
      </div>

    </>
    );
}