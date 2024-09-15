export type IntervalDirection = "UP" | "DOWN" | "SAME";


export class interval {
    size : number = 0;
    dir : IntervalDirection = "SAME";

    constructor(size : number = 0, dir : IntervalDirection = "SAME") {
        this.size  = size;
        this.dir = dir;
    }

    is_up() : boolean {
        return this.dir === "UP";
    }
    is_down() : boolean {
        return this.dir === "DOWN";
    }
    is_same() : boolean {
        return this.dir === "SAME";
    }

    is_step() : boolean {
        return this.size === 2;
    }
    
    is_skip() : boolean {
        return this.size === 3;
    }
    
    is_leap() : boolean {
        return this.size >= 4 ;
    }
    
    is_big_leap() : boolean {
        return this.size >= 5;
    }
}

export function compute_interval( first_note : number, second_note : number ) : interval {
    let dir : IntervalDirection;

    if (second_note > first_note) {
        dir = "UP";
    }  else if (first_note > second_note) {
        dir = "DOWN";
    } else {
        dir = "SAME";
    }

    let size : number = Math.abs(first_note - second_note) + 1

    return new interval(size, dir)
}