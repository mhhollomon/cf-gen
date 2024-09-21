import { compute_interval } from "./dataclasses/Interval";
import { checklist } from "./checks";

const allowedSpans :number[] = [5,6,8,10];
const allowedIntervalics : number[] = [2,3,4,5,6];

export default class CantusGenerator {

    size : number = 10;
    span : number = 0;
    
    user_span : null | number = null;
    notes : number[] = [];
    high_spot : number = 0;

    constructor(size : number, span : null | number ) {
        if (size > 16 || size < 8) {
            throw new Error("Invalid size");
        }

        if (span !== null) {
            if (span === 0) {
                span = null;
            } else if (! [5,6,8,10].includes(span)) {
                throw new Error("--highest must be one of 0,5,6,8,10");
            }
        }

        this.size = size;
        this.user_span = span;

        console.log(`Constructor - size = ${this.size} user_span = ${this.user_span}`)
    }

    set_notes_empty()  {

        //console.log(`set_notes_empty start: size = ${this.size}`);
        
        this.notes = []; 
        this.notes.length=this.size;
        //console.log(`set_notes_empty new array = [${this.notes}]`);
        this.notes.fill(0);
        //console.log(`set_notes_empty fill = [${this.notes}]`);
        this.notes[0] = 1;
        this.notes[this.size-1] = 1;
        this.notes[this.size-2] = 2;
        console.log(`set_notes_empty = ${this.notes}`);
    }

    
    replace_climax() {
        this.notes[this.high_spot] = this.span;
        //console.log(`replace_climax = ${this.notes}`);
    }

    place_high_note() {
        let prefix : number = 1;
        let suffix : number = this.size - 3;

        let tries : number = 20;
        while (true) {
            prefix = 1;
            suffix = this.size-3;
            // Pick a highest none
            if (this.user_span === null) {
                this.span = allowedSpans[Math.floor(Math.random() * allowedSpans.length)];
                console.log("Random span -- trying ", this.span);
            } else {
                this.span = this.user_span;
            }

            if (this.span > 5) {
                // give ourselves room
                prefix += 1;
                suffix -= 1;
            }
            if (this.span > 8) {
                // give ourselves even more room
                prefix += 1;
                suffix -= 1;
            }

            if (prefix < suffix) {
                break;
            } else if (this.user_span !== null) {
                throw new Error("Cannot find a space for the climax with the supplied highest note and size");
            } else {
                tries -= 1;
                if (tries < 0 ) {
                    throw new Error("Cannot find space for the climax");
                }
            }

        }

        this.high_spot = this.randrange(prefix, suffix);

        this.notes[this.high_spot] = this.span
        console.log(`place_high_note : span = ${this.span} high = ${this.high_spot} notes = ${this.notes}`);

    }

    note_okay(note : number, prev : number, next : number) : boolean {

        return allowedIntervalics.includes(compute_interval(prev, note).size) &&
            (next == 0 || allowedIntervalics.includes(compute_interval(note, next).size));

    }

    randrange(start : number, end : number) : number {
        start = Math.floor(start);
        end = Math.floor(end);

        return start + Math.floor(Math.random() * (end - start));
    }

    post_checks() : boolean {

        let retval = true;
        for (let check of checklist() ) {
            retval &&= check.check(this.notes);
        }

        return retval;
    }

    generate(all_pass : boolean) : number[] {

        const tries_per_span = 10;
        let tries : number = 100;
        let span_tries : number = tries_per_span;
        let found : boolean = false;

        this.set_notes_empty();

        while (tries > 0 && ! found) {
            this.generate_v1();
            if ((! all_pass) || this.post_checks()) {
                found = true;
            } else {
                this.set_notes_empty();
                tries -= 1;
                span_tries -= 1;
                if (span_tries <= 0) {
                    this.span = 0;
                    this.high_spot = 0;
                    span_tries = tries_per_span;
                }
            }
        }

        if (! found) {
            throw new Error("Could not find solution after 100 tries");
        }

        console.log(`generate cantus = ${this.notes}`);

        return this.notes;

    }

    generate_v1() {
        if (this.span === 0) {
            this.place_high_note();
        } else {
            this.replace_climax();
        }

        //console.log(`V1 start : notes = ${this.notes}`);;

        for(let n = 1; n < (this.size-2); n += 1 ) {
            if (this.notes[n] === 0) {
                let new_note = 0;
                let tries = 100;
                while (tries > 0) {
                    new_note = this.randrange(1, this.span);

                    if (this.note_okay(new_note, this.notes[n-1], this.notes[n+1])) {
                        break;
                    } else {
                        tries -= 1;
                    }
                }

                if (new_note !== 0) {
                    this.notes[n] = new_note;
                } else {
                    throw new Error("Could not find a note for the sequence")
                }

            }
        }
    }


}