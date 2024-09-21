import { compute_interval, type IntervalDirection } from "./dataclasses/Interval";

function default_reporter(name : string, status : boolean, msg : string | null) : void {
    if (status) {
        console.log(`${name} - Okay`);
    } else if (msg === null) {
        console.log(name, " - ", msg);
    } else {
        console.log(`${name} - Check Failed`);
    }
}

export type ReportType = (name : string, status : boolean, msg : (string | null)) => void;


abstract class CheckBase {
    name : string
    reporter : ReportType

    constructor(name : string, reporter : ReportType | null = null) {
        this.name = name;
        this.reporter = reporter ? reporter : default_reporter;
    }

    abstract check(cantus : number[]) : boolean;

    report(status : boolean, msg : string | null) : void {
        this.reporter(this.name, status, msg);
    }


}

class consonant_outlines extends CheckBase {

    constructor(reporter : ReportType | null = null) {
        super("consonant_outlines", reporter);
    }

    check(cantus : number[]) : boolean {

        let retval : boolean = true;
        let msg : string | null = null;
        let size : number = cantus.length;

        let direction : IntervalDirection = "SAME";
        let first = cantus[0];
        let last = cantus[0];

        for (let n = 1; n < size; n++) {
            let this_note = cantus[n];
            let intvl = compute_interval(cantus[n-1], this_note);
            if (intvl.dir !== direction) {
                let leap = compute_interval(first, last);
                if (! [1,2,3,4,5,6,8,10].includes(leap.size)) {
                    msg = `outlined dissonant interval ${leap.size} detected`;
                    retval = false;
                    break;
                }

                if ((first === 4 && last === 7) || (first === 7 && last === 4)) {
                    msg = "Tritone interval outline detected";
                    retval = false;
                    break;
                }
                direction = intvl.dir;
                first = last;
            }
            last = this_note;
        }

        if (retval) {
            // take care of the end
            let leap = compute_interval(first, last);
            if (! [1,2,3,4,5,6,8,10].includes(leap.size)) {
                msg = `outlined dissonant interval ${leap.size} detected`;
                retval = false;
            }

            if ((first === 4 && last === 7) || (first === 7 && last === 4)) {
                msg = "Tritone interval outline detected";
                retval = false;
            }

        }

        this.report(retval, msg);
        return retval;
    }

}

class recover_leaps extends CheckBase {
    constructor(reporter : ReportType | null = null) {
        super("recover_leaps", reporter);
    }

    check(cantus : number[]) : boolean {
        let retval = true;
        let msg : string | null = null;
        const size = cantus.length;

        for(let n = 1; n < size-1; n++) {
            let this_note = cantus[n];
            let intvl = compute_interval(cantus[n-1], this_note);
            if (intvl.is_big_leap()) {
                let recover = compute_interval(this_note, cantus[n+1]);

                if (recover.dir === intvl.dir || recover.is_leap()) {
                    msg = `big leap not recovered at ${n-1}`;
                    retval = false;
                    break;
                }
            }
        }

        this.report(retval, msg);

        return retval;
    }
}

class TrillDescription {
    start = 0;
    first = 0;
    second = 0;
    size = 0;

    restart(start : number, first : number) : void {
        this.first = first;
        this.start = start;
        this.second = 0;
        this.size = 1;
    }

    is_complete() : boolean {
        return this.size >= 4;
    }

}

class no_trills extends CheckBase {
    constructor(reporter : ReportType | null = null) {
        super("no_trills", reporter);
    }

    check(cantus : number[]) : boolean {
        let retval = true;
        let msg : string | null = null;
        const size = cantus.length;

        let trill = new TrillDescription();
        trill.start = 0;
        trill.first = cantus[0];
        trill.second = 0;
        trill.size = 1;


        for (let n = 1; n < size-1; n++) {
            let this_note = cantus[n];
            let intvl = compute_interval(cantus[n-1], this_note);

            if (intvl.is_step()) {
                if (trill.size % 2 == 1) {
                    if (trill.second == 0) {
                        trill.second = this_note;
                        trill.size += 1;
                    } else if (this_note == trill.second) {
                        trill.size += 1;
                    } else {
                        trill.restart(trill.start+1, trill.second);
                        trill.second = this_note;
                        trill.size += 1;
                    }
                } else {
                    if (this_note == trill.first) {
                        trill.size += 1;
                    } else {
                        trill.restart(trill.start+1, trill.second);
                        trill.second = this_note;
                        trill.size += 1;
                    }
                }
            } else {
                trill.restart(n, this_note);
            }

            if (trill.is_complete()) {
                msg = `found trill starting at position ${trill.start}`;
                retval = false;
            }
        }
        if (retval && trill.is_complete()) {
            msg = `found trill starting at position ${trill.start}`;
            retval = false;
        }

        this.report(retval, msg);
        return retval;
    }

}

export function checklist(reporter : ReportType | null = null) : CheckBase[] {
    return [
        new consonant_outlines(reporter),
        new recover_leaps(reporter),
        new no_trills(reporter),
    ]
}
