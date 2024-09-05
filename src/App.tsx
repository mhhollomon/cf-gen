import logo from '@/assets/cantus-icon.jpg'

import CantusGeneratorUI from './components/CantusGeneratorUI';

export default function App() {

  return (
    <>
    <header class="container-fluid gx-0 bg-primary-subtle">
      <div class="row align-items-center m-3">
        <img src={logo} height="100px" width="100px"
          class="header-logo" />
        <div class="col-8 text-center">
          <span class="text-black fs-1 p-3 p-md-4">Cantus Fortuitus</span>
        </div>
      </div>
    </header>

    <h3>Randomly Generated Cantus Firmus</h3>
    <p>For all your counterpoint needs.</p>

    <CantusGeneratorUI />
    </>
  )
}