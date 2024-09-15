import { writable } from 'svelte/store';

export const cantusSize = writable(10);

export const highest = writable("Random");

export const cantus = writable<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1]);

