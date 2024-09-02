
import GeneratorOptions from "./GeneratorOptions";
import ClefDisplay from "./ClefDisplay";

import {createSignal} from 'solid-js';

import ChecksDisplay from "./ChecksDisplay";

import { CheckStatusList, startingCheckStatus } from '../dataclasses/CheckStatus.tsx'


export default function CantusGenerator() {

   let [checks ] = createSignal<CheckStatusList>(startingCheckStatus());
   let [cantus ] = createSignal<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1]);

   function generate_cantus(size : number, highest : string) {
    console.log("generate_cantus called")
    console.log("size = " + size)
    console.log("highest = " + highest)

   }

    return (
        <>
        <div class="container-fluid">
            <GeneratorOptions generate={generate_cantus}/>
            <ClefDisplay cantus={cantus()}/>
            <ChecksDisplay checks={checks}/>
        </div>
        </>
    );
}