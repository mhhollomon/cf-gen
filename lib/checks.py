
from typing import List, Callable, Union, Type
from dataclasses import dataclass

import lib.music as _m
from abc import ABC, abstractmethod

        
def default_reporter(name: str, status : bool, msg : Union[str, None]) :
    if status :
        print(f"{name} - Okay")
    elif msg :
        print(name, " - ", msg)
    else :
        print(f"{name} - Check Failed")


ReporterType = Callable[[str, bool, Union[str, None]], None]

class CheckBase(ABC) :
    def __init__(self, 
                 reporter : Union[ReporterType, None] = None ) -> None:
        
        if reporter is None :
            self.reporter : ReporterType = default_reporter
        else :
            self.reporter : ReporterType = reporter

    @abstractmethod
    def check(self, cantus : List[int]) -> bool :
        return True
        
    def report(self, status : bool, msg : Union[str, None] ) -> None :
        self.reporter(self.name(), status, msg)

    @classmethod
    def name(cls) -> str :
        return cls.__name__


class consonant_outlines(CheckBase) :

    def check(self, cantus : List[int]) -> bool :
        retval : bool = True
        msg : Union[str, None] = None
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
                    msg = f"outlined disonant interval {leap.size} detected"
                    retval = False
                    break
                # special check for tritone (assumes major scale)
                if (first == 4 and last == 7) or (first == 7 and last == 4) :
                    msg = "Tritone interval outline detected"
                    retval = False 
                    break
                direction = intvl.dir
                first = last
            last = this_note

        if retval :
            leap = _m.compute_interval(first, last)
            if leap.size not in [1,2,3,4,5,6,8,10] :
                msg = f"outlined disonant interval {leap.size} detected"
                retval = False
            elif (first == 4 and last == 7) or (first == 7 and last == 4) :
                msg = "Tritone interval outline detected"
                retval = False 

        self.report(retval, msg )

        return retval

class recover_leaps(CheckBase) :
    def check(self, cantus : List[int]) -> bool :
        """Leaps of a 5th or larger must be recovered by a step or skip
        in the opposite direction"""
        retval : bool = True
        msg = None
        size : int = len(cantus)


        for n in range(1, size-1) :
            this_note = cantus[n]
            intvl = _m.compute_interval(cantus[n-1], this_note )

            if intvl.is_big_leap() :
                recover = _m.compute_interval(this_note, cantus[n+1])

                if recover.dir == intvl.dir or recover.is_leap() :
                    msg = f"big leap not recovered at {n-1}"
                    retval = False
                    break

        self.report(retval, msg )

        return retval

@dataclass
class TrillDescription :
    start : int = 0
    first : int = 0
    second : int = 0
    size : int = 0

    def restart(self, start : int, first : int) -> None :
        self.first = first
        self.start = start
        self.second = 0
        self.size = 1

    def is_complete(self) -> bool :
        return self.size >= 4

class no_trills(CheckBase) :
    def check(self, cantus : List[int]) -> bool :
        retval = True
        msg = None
        size : int = len(cantus)

        trill = TrillDescription(0, cantus[0], 0, size=1)

        for n in range(1, size-1) :
            this_note = cantus[n]
            #print(f"this_note = {this_note}, trill = {trill}")
            intvl = _m.compute_interval(cantus[n-1], this_note)

            if intvl.is_step() :
                if trill.size % 2 == 1 :
                    #print("size is odd")
                    if trill.second == 0 :
                        trill.second = this_note
                        trill.size += 1
                    elif this_note == trill.second :
                        trill.size += 1
                    else :
                        #print("this_note is not the same as the second note. restarting")
                        trill.restart(trill.start+1, trill.second)
                        trill.second = this_note
                        trill.size += 1
                else :
                    #print("size is even")
                    if this_note == trill.first :
                        trill.size += 1
                    else :
                        #print("this_note is not the same as the first note. restarting")
                        trill.restart(trill.start+1, trill.second)
                        trill.second = this_note
                        trill.size += 1
            else :
                #print("not a step")
                trill.restart(n, this_note)

            if trill.is_complete() :
                msg = f"found trill starting at position {trill.start}"
                retval = False
                break

        if retval and trill.is_complete() :
            msg = f"found trill starting at position {trill.start}"
            retval = False

        self.report(retval, msg )

        return retval
    

def checklist() -> List[Type[CheckBase]] :
    return [
        consonant_outlines,
        recover_leaps,
        no_trills
    ]
