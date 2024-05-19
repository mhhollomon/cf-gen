const checks = [
    { name : 'A'},
    { name : 'B' },
    { name : 'C' }
];


export default function Checks() {

    return (
    <>
    <div className="container-fluid my-3 border-top border-bottom">
      <div className="row">
        <div id="checks" className="col-12 col-md-5">
        <table className="table">
            <tr>
                <th>Status</th>
                <th>Check</th>
                <th>Message</th>
            </tr>
            {checks.map((check) => 
                <tr id="{{check.name}}">
                    <td><span className="material-symbols-outlined">
                    indeterminate_check_box
                    </span></td>
                    <td>{check.name}</td>
                    <td></td>
                </tr>
            )}

        </table>

        </div>
      </div>
    </div>

    </>

    );
}