<script lang="ts">

    export let generate : CallableFunction;
    export let midi : CallableFunction;

    import { Form, FormGroup, Button, Input, Tooltip } from '@sveltestrap/sveltestrap';

    import {cantusSize, highest} from '../lib/stores';

    let radioGroup : string = "good";

    function doClick(_ : any): void {
        generate($cantusSize, $highest, radioGroup === "good");
    }

    function doSizeChange(event : any) : void {
        cantusSize.set(event.target.value);
    }

    function doHighestChange(event : any) : void {
        highest.set(event.target.value);
    }

</script>


<div class="row">
    <div class="col-12">

        <Button color="primary" id="generate"
            on:click={doClick}>Generate</Button>

        <div class="d-inline-block align-middle mx-3">
            <FormGroup floating label="Size">
                <Input type="number" name="size" min="8" max="16" 
                    on:change={doSizeChange} value={$cantusSize} id="size-input" placeholder="10"/>
                <Tooltip target="size-input">Number of notes in the generate CF</Tooltip>
                
            </FormGroup>
        </div>

        <div class="d-inline-block align-middle mx-3">
            <FormGroup floating label="Span">
                <Input type="select" id="span-input" on:change={doHighestChange} 
                    name="select-input">
                    <option value="Random">Random</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </Input>
                <Tooltip target="span-input">Highest note as a scale degree in the generate CF</Tooltip>

            </FormGroup>
        </div>

    </div> 
</div>


<div class="row">
    <Form class="col-3">
        <FormGroup>
            <Input type="radio" id="method-good" bind:group={radioGroup}
                label="Until All Checks Pass" name="method" value="good" />
            <Input type="radio" id="method-once" bind:group={radioGroup}
                label="Try Once" name="method" value="once" />
        </FormGroup>
    </Form>

</div>

<div class="row mt-3 border-top">
    <div class="col-3 mt-3">
        <Button color="primary" id="midi" on:click={midi()}>Generate Midi</Button>
    </div>
</div>
