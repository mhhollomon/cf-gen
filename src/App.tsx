import React from 'react';
import logo from './cantus-icon.jpg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <header className="container-fluid gx-0 bg-primary-subtle">
    <div className="row align-items-center m-3">
      <img src={logo} height="100px" width="100px"
        className="header-logo" />
      <div className="col-8 text-center">
        <span className="text-black fs-1 p-3 p-md-4">Cantus Fortuitus</span>
      </div>
    </div>
  </header>

  <h3>Randomly Generated Cantus Firmus</h3>
  <p>For all your counterpoint needs.</p>
  </>

  );
}

export default App;
