<script lang="ts">
    import { type CheckStatusList, type CheckStatus } from './dataclasses/CheckStatus'

    export let checks : CheckStatusList;

    type statusDisplay = {
        icon : string;
        background : string;
    }

    function checkDisplay(check : CheckStatus) : statusDisplay {
        let icon : string = '';
        let background : string = '';

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

        return {icon : icon, background : background };
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
                {#each checks as c }
                <tr id={c.name} >
                    <td><span class="material-symbols-outlined">
                        {checkDisplay(c).icon}
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
