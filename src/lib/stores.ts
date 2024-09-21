import { writable } from 'svelte/store';

export const cantusSize = writable(10);

export const highest = writable("Random");

export const cantus = writable<number[]>([]);

export interface ModalInfo {
    open : boolean;
    message : string;
}

export const errorModal = writable<ModalInfo>({open : false, message : ''});

export function openErrorModal(msg : string) {
    errorModal.set({open : true, message : msg });
}

export function closeErrorModal() {
    errorModal.set({open : false, message : '' });
}
