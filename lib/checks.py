
from typing import List

import lib.music as _m

def consonant_outlines(cantus : List[int]) -> bool :
    retval : bool = True
    size : int = len(cantus)

    # All outlines are consonant
    direction = _m.SAME
    first = cantus[0]
    last = cantus[0]
    for n in range(1, size) :
        this_note = cantus[n]
        intvl = _m.compute_interval(cantus[n-1], this_note )
        if intvl.dir != direction :
            leap = _m.compute_interval(first, last)
            if leap.size not in [1,2,3,4,5,6,8,10] :
                print(f"Sad : outlined disonant interval {leap.size} detected")
                retval = False
                break
            # special check for tritone (assumes major scale)
            if (first == 4 and last == 7) or (first == 7 and last == 4) :
                print("Sad : Tritone interval outline detected")
                retval = False 
                break
            direction = intvl.dir
            first = last
        last = this_note

    if retval :
        leap = _m.compute_interval(first, last)
        if leap.size not in [1,2,3,4,5,6] :
            print(f"Sad : outlined disonant interval {leap.size} detected")
            retval = False
        elif (first == 4 and last == 7) or (first == 7 and last == 4) :
            print("Sad : Tritone interval outline detected")
            retval = False 

    return retval
