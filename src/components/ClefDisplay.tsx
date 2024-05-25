const  y_offsets : number[] = [-50, 20, 70, 120, 170, 220, 270, 320, 370, 420];

interface noteDisplayData {
  pos : number;
  symbol : string;
  note : number;
  klass : string;
  // offsets of the container
  left : number;
  // offsets of the note in the containing box
  y_offset : number;
  x_offset : number;
}

export default function ClefDisplay(
    {cantus} : { cantus : number[] }
) {

    // use a percentage of the width of our parent
    // the complication is to round to single decimal place
    let width : number = (Math.round(1000.0/(cantus.length+1))) / 10.0;
    
    // -24 is padding added by bootstrap
    //let pixel_width : number = Math.round((container.offsetWidth-24) * ( width / 100.0))
    let ledger_box_width : number = width / 2.0;

    let current_pos : number = -1;

    let noteData : noteDisplayData[] = cantus.map((note) => {

      current_pos += 1;
      let last_note : boolean = current_pos == cantus.length - 1;

      let symbol : string =  String.fromCodePoint(last_note ? 0x1D15C : 0x1D15D);

      // The boxes are positioned relative to where they would be "normally".
      // Since each is (ledger_box_width) wide, each
      // would normally start lbw*pos over. But we want them spaced width
      // apart.
      let left : number = Math.round(width * current_pos) - 
          Math.round(ledger_box_width * current_pos) + 
          Math.round(width/1.1)


      return {
        pos : current_pos,
        symbol : symbol,
        note : note,
        klass : note === 1 ? 'border-top' : '',
        y_offset : y_offsets[note-1],
        x_offset :last_note ? 0 : 13,
        left : left,
      };

    }

    );

    return (
    <>
    <div id="output" style={{fontSize: "2em"}}>[ {cantus.join(", ")}]</div>
    <div id="music-staff" className="container-fluid">
      <div id="staff-line-5" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-4" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-3" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-2" className="staff-line border-bottom border-dark border-3"></div>
      <div id="staff-line-1" className="staff-line border-bottom border-dark border-3"></div>
      <div id="ledger-line" className="ledger-line">
        <span className="clef">&#x1d11e;</span>
      </div>
      <div id="spacer-line" className="spacer-line">
        {noteData.map((n) => {
          return <div key={n.pos} 
            className={`d-inline-block note-box ${n.klass} border-3 border-dark`}
            style={{ width:"50px", left:`${n.left}%`
            }}>
              <div className="position-absolute" style={{bottom:`${n.y_offset}%`, left:`${n.x_offset}%`}}>
            <span className="noto-music-regular">{n.symbol}</span></div>
        </div>


        })}
      </div>
    </div>

    </>

    );

}