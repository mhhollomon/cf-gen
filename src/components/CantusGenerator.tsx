
import GeneratorOptions from "./GeneratorOptions";
import ClefDisplay from "./ClefDisplay";
import Checks from "./Checks";

export default function CantusGenerator() {

    return (
        <>
        <div className="container-fluid">
            <GeneratorOptions />
            <ClefDisplay />
            <Checks />
        </div>
        </>
    );
}