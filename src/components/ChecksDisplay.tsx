
import { CheckStatusList } from '@/dataclasses/CheckStatus.tsx'

export default function ChecksDisplay(
    { checks } : { checks : CheckStatusList }) {

    return (
    <>
    <div className="container-fluid my-3 border-top border-bottom">
      <div className="row">
        <div id="checks" className="col-12 col-md-5">
        <table className="table">
            <thead><tr>
                <th>Status</th>
                <th>Check</th>
                <th>Message</th>
            </tr></thead>
            <tbody>
            {checks.map((check) => {
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

                return <tr id={check.name} key={check.name} style={
                    background === '' ? {} : { 'backgroundColor' : background }
                }>
                    <td><span className="material-symbols-outlined">
                    {icon}
                    </span></td>
                    <td>{check.name}</td>
                    <td>{check.message}</td>
                </tr>
            }
            )}
            </tbody>

        </table>

        </div>
      </div>
    </div>

    </>

    );
}