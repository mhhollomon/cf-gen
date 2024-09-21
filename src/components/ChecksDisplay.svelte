<script lang="ts">
    import { type CheckStatusList, type CheckStatus } from '../lib/dataclasses/CheckStatus'

    export let checks : CheckStatusList;

    type statusDisplay = {
        icon : string;
        background : string;
        name : string;
        message : string;
    }

    function checkDisplay(check : CheckStatus) : statusDisplay {
        let icon : string = '';
        let background : string = '';

        switch(check.status){
            case 'YES' : 
                background = '#33FF33';
                icon = 'check_box'; 
                break;
            case 'NO'  : 
                background = '#FF3333';
                icon = 'disabled_by_default';
                break;
            default    : 
                background = 'inherit';
                icon = 'indeterminate_check_box'; 
                break;
        }

        return {icon : icon, background : background, 
            name : check.name, message : check.message };
    }

    function displayData(checks : CheckStatusList) : statusDisplay[] {
        return checks.flatMap((c) => checkDisplay(c));
    }

</script>

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
                {#each displayData(checks) as c }
                <tr id={c.name} >
                    <td style="background-color : {c.background};"><span class="material-symbols-outlined">
                        {c.icon}
                        </span></td>
                    <td>{c.name}</td>
                    <td>{c.message}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
  </div>
</div>
