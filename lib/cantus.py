import random
from typing import List, Any


from lib.music import compute_interval
from lib.checks import checklist

class CantusGenerator() :
    def __init__(self, size : int) -> None:
        if size > 16 or size < 4 :
            raise ValueError('--size must be 4-16 inclusive')
        
        self.size : int = size
        self.notes : List[int] = []
        self.high_spot : int = 0
        self.span :int = 0

        self.set_notes_empty()

    def set_notes_empty(self) -> None :
        self.notes = [0]*self.size
        self.notes[0] = 1
        self.notes[-1] = 1
        self.notes[-2] = 2

    def replace_climax(self) -> None :
        self.notes[self.high_spot] = self.span


    def place_high_note(self) -> None :
        # first place the highest note can be
        prefix = 1
        # Last place it can be
        suffix = self.size-3

        while True :
            # Pick a highest note
            self.span = random.choice([5,6,8,10])

            if self.span > 5 :
                # give ourselves room
                prefix += 1
                suffix -= 1
            if self.span > 8 :
                # give ourselves (more) room
                prefix += 1
                suffix -= 1

            if prefix < suffix :
                # This will work
                break
        
        self.high_spot = random.randrange(prefix, suffix+1)

        self.notes[self.high_spot] = self.span
        print(f"span = {self.span}")
        print(f"high = {self.high_spot}")


    def note_okay(self, note : int, prev : int, next : int) -> int :
        retval = True
        if compute_interval(prev, note).size not in [2,3,4,5,6] :
            retval = False
        if next > 0 :
            if compute_interval(note, next).size not in [2,3,4,5,6] :
                retval = False

        return retval
    

    
    def post_checks(self) -> bool :

        # do this to specifically ignore short circuiting
        retval : bool = True

        for check in checklist() :
            retval &= check().check(self.notes)

        return retval
    
    def generate(self) -> List[int] :
         
        tries : int = 100
        span_tries : int = 10
        found : bool = False
        while tries > 0 and not found :
            self.generate_v1()
            print(f"Testing = {self.notes}")
            if self.post_checks() :
                found = True
            else :
                self.set_notes_empty()
                tries -= 1
                span_tries -= 1
                if span_tries <= 0 :
                    self.span = 0
                    self.high_spot = 0
                    span_tries = 10


        if found :
            return self.notes
        else :
            raise Exception("Could not find solution after 100 tries")
        


    def generate_v1(self) -> None :
        if self.span == 0 :
            self.place_high_note()
        else :
            self.replace_climax()

        for n in range(1, self.size-2) :
            if self.notes[n] == 0:
                new_note = 0
                tries = 100
                while tries > 0 :
                    new_note = random.randrange(2, self.span)

                    if self.note_okay(
                            new_note, 
                            self.notes[n-1], 
                            self.notes[n+1]) :
                        break
                    else :
                        tries -= 1

                if new_note != 0 :
                    self.notes[n] = new_note
                else :
                    raise Exception("Could not find a note for the sequence")


