<script lang="ts">

    export let cantus : number[];

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

    let noteData : noteDisplayData[];
    let fake;

    $: {

      fake = cantus;

      console.log(`Length = ${cantus.length}`);
      
      // use a percentage of the width of our parent
      // the complication is to round to single decimal place
      let width = (Math.round(1000.0/(cantus.length+1))) / 10.0;

      console.log(`Setting width to ${width}`);
      
      // -24 is padding added by bootstrap
      //let pixel_width : number = Math.round((container.offsetWidth-24) * ( width / 100.0))
      let ledger_box_width = width / 2.0;

      let current_pos : number = -1;

      noteData = cantus.map((note : number) => {

        current_pos += 1;
        let last_note : boolean = current_pos == cantus.length - 1;

        let symbol : string =  String.fromCodePoint(last_note ? 0x1D15C : 0x1D15D);

        // The boxes are positioned relative to where they would be "normally".
        // Since each is (ledger_box_width) wide, each
        // would normally start lbw*pos over. But we want them spaced width
        // apart.
/*         let left : number = Math.round(width * current_pos) - 
            Math.round(ledger_box_width * current_pos) + 
            Math.round(width/1.1);
 */
        let left : number = Math.round(width * current_pos - 
            ledger_box_width * current_pos + 
            width/1.1);

        return {
          pos : current_pos,
          symbol : symbol,
          note : note,
          klass : note === 1 ? 'border-top' : '',
          y_offset : y_offsets[note-1],
          x_offset :last_note ? 0 : 13,
          left : left,
        };

      });
    }


</script>

<div id="output" style="font-size: 2em">[ {cantus.join(", ")}]</div>
<div id="music-staff" class="container-fluid">
  <div id="staff-line-5" class="staff-line border-bottom border-dark border-3"></div>
  <div id="staff-line-4" class="staff-line border-bottom border-dark border-3"></div>
  <div id="staff-line-3" class="staff-line border-bottom border-dark border-3"></div>
  <div id="staff-line-2" class="staff-line border-bottom border-dark border-3"></div>
  <div id="staff-line-1" class="staff-line border-bottom border-dark border-3"></div>
  <div id="ledger-line" class="ledger-line">
    <span class="clef">&#x1d11e;</span>
  </div>
  <div id="spacer-line" class="spacer-line">
    {#each noteData as nd}
      <div 
        class="d-inline-block note-box {nd.klass} border-3 border-dark"
        style="width:50px; left:{nd.left}%"
        >
        <div class="position-absolute" style="bottom:{nd.y_offset}%; left:{nd.x_offset}%">
            <span class="noto-music-regular">{nd.symbol}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
