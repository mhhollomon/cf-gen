import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function GeneratorOptions() {

    return (
    <>
        <div className="row m-3">
            <div className="col-12">

                <Button type="button" className="btn btn-primary" id="generate">Generate</Button>

                <div className="d-inline-block align-middle mx-3">
                    <FloatingLabel label="Cantus Size" >
                    <Form.Control type="number" name="size" min="8" max="16" value="10" id="size-input" />
                    </FloatingLabel>
                </div>

                <div className="d-inline-block align-middle mx-3">
                    <FloatingLabel label="Highest Note" >
                    <Form.Select id="span-input" name="select-input">
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