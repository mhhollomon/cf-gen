
import { CheckStatus } from '../dataclasses/CheckStatus.tsx'

import { For } from 'solid-js';


export default function ChecksDisplay(props : any) {

    return (
    <>
    <div class="container-fluid my-3 border-top border-bottom">
      <div class="row">
        <div id="checks" class="col-12 col-md-5">
        <table class="table">
            <thead><tr>
                <th>Status</th>
                <th>Check</th>
                <th>Message</th>
            </tr></thead>
            <tbody>
                <For each={props.checks()}>{(check : CheckStatus) => {
                    let icon : string = '';
                    let background = '';
    
                    switch(check.status){
                        case 'YES' : 
                            icon = 'check_box'; 
                            break;
                        case 'NO'  : 
                            icon = 'disabled_by_default';
                            background = '#FF3333';
                            break;
                        default    : 
                            icon = 'indeterminate_check_box'; 
                            break;
                    }
                
                    return <tr id={check.name} style={
                        background === '' ? {} : { 'background-color' : background }
                    }>
                        <td><span class="material-symbols-outlined">
                        {icon}
                        </span></td>
                        <td>{check.name}</td>
                        <td>{check.message}</td>
                    </tr>
    
                    
                }}
                </For>

            </tbody>

        </table>

        </div>
      </div>
    </div>

    </>

    );
}