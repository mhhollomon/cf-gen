<script lang="ts">
  import logo from '../assets/cantus-icon.jpg';
  import CantusGeneratorUi from './CantusGeneratorUI.svelte';

  import { 
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from '@sveltestrap/sveltestrap';

  import { errorModal, closeErrorModal } from '../lib/stores';

</script>

<header class="container-fluid gx-1 bg-primary-subtle">
  <div class="row align-items-center m-3">
    <img src={logo} height="100px" width="100px"
      class="header-logo col-2" alt="Cantus Fortuitus Logo"/>
    <div class="col-8 text-center">
      <span class="text-black fs-1 p-3 p-md-4">Cantus Fortuitus</span>
    </div>
  </div>
</header>
<main class="m-3">
  <h3>Randomly Generated Cantus Firmus</h3>
  <p>For all your counterpoint needs.</p>
  <CantusGeneratorUi />
</main>

<Modal isOpen={$errorModal.open}>
  <ModalHeader>ERROR</ModalHeader>
  <ModalBody>{$errorModal.message}</ModalBody>
  <ModalFooter>
    <Button color="secondary" on:click={closeErrorModal}>Cancel</Button>  
  </ModalFooter>
</Modal>