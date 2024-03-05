from typing import Any, List, NamedTuple

UP = 'up'
DOWN = 'down'
SAME = 'same'

class interval(NamedTuple) :
    size : int
    dir : str # one of the above

    def is_up(self) -> bool :
        return self.dir.lower() == UP
    
    def is_down(self) -> bool :
        return self.dir.lower() == DOWN
    
    def is_same(self) -> bool :
        return self.dir.lower() == SAME
    
    def is_step(self) -> bool :
        return self.size == 2
    
    def is_skip(self) -> bool :
        return self.size == 3
    
    def is_leap(self) -> bool :
        return self.size >= 4
    
    def is_big_leap(self) -> bool :
        return self.size >= 5


def compute_interval(first_note : int, second_note : int) -> interval :
    if second_note > first_note :
        dir = UP
    elif first_note > second_note :
        dir = DOWN
    else :
        dir = SAME

    size = abs(first_note - second_note) + 1

    return interval(size, dir)
