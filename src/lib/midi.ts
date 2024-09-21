import MidiWriter from 'midi-writer-js';
import type { Writer } from 'midi-writer-js/build/types/writer';

const offsets = [
    0, 2, 4, 5, 7, 9, 11, 12, 14, 16
];

const base_note = 60; // middle c (C4 concert) 

export function generate_midi_notes(cantus : number[], transpose : number) : Writer {
    const track = new MidiWriter.Track();

    for(let i=0; i<cantus.length; i++) {
        const midi_note = base_note + transpose + offsets[cantus[i]];
        const duration = (i === cantus.length-1) ? 'T1024' : '1';
        const event = new MidiWriter.NoteEvent(
            {pitch : midi_note, duration : duration });

        track.addEvent(event);
    }

     return new MidiWriter.Writer(track);
}