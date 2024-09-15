<script lang="ts">
    import { cantus } from "./stores";
    import { startingCheckStatus } from './dataclasses/CheckStatus';

    import GeneratorOptions from "./GeneratorOptions.svelte";
    import ClefDisplay from "./ClefDisplay.svelte";
    import ChecksDisplay from "./ChecksDisplay.svelte";

    function generate_cantus(size : number, highest : string) {
        console.log("generate_cantus called")
        console.log("size = " + size)
        console.log("highest = " + highest)
   }

</script>

<div class="container-fluid">
    <GeneratorOptions generate={generate_cantus} />
    <ClefDisplay cantus={$cantus} />
    <ChecksDisplay checks={startingCheckStatus()} />
</div>