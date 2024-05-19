export default function ClefDisplay() {

    return (
    <>
    <div id="output" style={{fontSize: "2em"}}>[]</div>
    <div id="music-staff" className="container-fluid">
      <div id="staff-line-5" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-4" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-3" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-2" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-1" className="staff-line border-bottom border-dark border-3"></div>
      <div id="ledger-line" className="ledger-line">
        <span className="clef">&#x1d11e;</span>
      </div>
      <div id="spacer-line" className="spacer-line"></div>
    </div>

    </>

    );

}