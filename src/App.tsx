import CantusGeneratorUI from "~/components/CantusGeneratorUI"
import "./App.css"
import Header from "./components/header"

function App() {

    return (
        <>
            <Header title="Cantus Fortuitus" avatar="notes-logo.svg" />
            <div className="title-block">
                <h1 className="title-block__title">Randomly Generated Cantus Firmus</h1>
                <p className="title-block__subtitle">For all your counterpoint needs.</p>
            </div>
            <main className="main">
                <CantusGeneratorUI />
            </main>
        </>
    )
}

export default App
