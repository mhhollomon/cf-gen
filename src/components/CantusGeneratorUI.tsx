import ClefDisplay from "~/components/ClefDisplay"
import GeneratorOptions from "~/components/GeneratorOptions"
import { ChecksDisplay } from "~/components/ChecksDisplay"
import "./CantusGeneratorUI.css"

export default function CantusGeneratorUI() {
    return (
        <div className="cantus-generator-ui">
            <GeneratorOptions />
            <hr/>
            <ClefDisplay />
            <hr/>
            <ChecksDisplay />
        </div>
    )
}
