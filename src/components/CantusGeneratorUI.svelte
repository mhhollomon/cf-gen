<script lang="ts">
    import { cantus } from "../lib/stores";
    import { type CheckStatusList } from '../lib/dataclasses/CheckStatus';
    import CantusGenerator from '../lib/CantusGenerator';

    import { 
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input
  } from '@sveltestrap/sveltestrap';

    import { saveAs } from "file-saver";


    import { openErrorModal } from "../lib/stores";

    import GeneratorOptions from "./GeneratorOptions.svelte";
    import ClefDisplay from "./ClefDisplay.svelte";
    import ChecksDisplay from "./ChecksDisplay.svelte";
    import { checklist } from "../lib/checks";

    import { writable } from "svelte/store";
    import { generate_midi_notes } from "../lib/midi";

    const midiModalOpen = writable(false);

    const tonics = [
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B"
    ]

    let TonicNote : number = 0;

    function openMidiModal () {
        midiModalOpen.set(true);
    }

    function closeMidiModal() {
        midiModalOpen.set(false);
    }

    function generate_cantus(size : number, highest : string, all_pass : boolean ) {
        console.log(`generate_cantus called - size = ${size}, highest = ${highest}`);

        let span : number | null = null;
        if (highest === "Random") {
            span = null
        } else {
            span = parseInt(highest);
        }

        try {
            let gen = new CantusGenerator(size, span);

            const newNotes = gen.generate(all_pass);

            cantus.set(newNotes);
        } catch (error : any) {
            openErrorModal(error.toString());
        }
   }

   function genCheckStatus(notes : number[]) : CheckStatusList {

    let retval : CheckStatusList = [];
    let check_list;

    if ($cantus.length === 0) {
        function reporter(name : string, status : boolean, msg : string | null) {
            retval.push({
                status : "UNKNOWN",
                name : name,
                message : ''
            });
        }
        check_list = checklist(reporter);
    } else {
        function reporter(name : string, status : boolean, msg : string | null) {
            retval.push({
                status : status ? "YES" : "NO",
                name : name,
                message : msg ? msg : ''
            });
        }

        check_list = checklist(reporter);
    }


    for (let c of check_list) {
        c.check(notes);
    }

    return retval;

   }


   async function do_midi(fileName : string) {

    const writer = generate_midi_notes($cantus, TonicNote);

    const blob = new Blob([writer.buildFile()], {type: "audio/midi"});

    const opts = {
        startIn : "downloads",
        suggestedName : "cantus_firmus.mid",
        types : [
            { accept : { "audio/midi" : [".mid", ".midi"]}}
        ]
    };

    let fileHandle = await window.showSaveFilePicker(opts);

    saveAs(blob, "CantusFirmus.mid");

    closeMidiModal();
    

   }

</script>

<div class="container-fluid">
    <GeneratorOptions generate={generate_cantus} midi={openMidiModal} />
    <ClefDisplay cantus={$cantus} />
    <ChecksDisplay checks={genCheckStatus($cantus)} />
</div>
<Modal isOpen={$midiModalOpen}>
    <ModalHeader>Generate Midi</ModalHeader>
    <ModalBody>
        {#each tonics as t, i}
            <Input type="radio" bind:group={TonicNote} value={i} label={t} />
        {/each}
    </ModalBody>
    <ModalFooter>
        <Button color="primary" on:click={do_midi}>Generate</Button>
        <Button color="secondary" on:click={closeMidiModal}>Cancel</Button>  
    </ModalFooter>
  </Modal>