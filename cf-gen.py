#!/bin/env python

import argparse
from typing import Any

from lib.cantus import CantusGenerator

def main() :

    parser = argparse.ArgumentParser()
    parser.add_argument('-s', '--size', type=int, default=10,
        help="Number of notes in CF (>=4 <=16)")

    args : Any = parser.parse_known_args()

    obj = CantusGenerator(args[0].size)

    print(f"Cantus = {obj.generate()}")

if __name__ == "__main__" :
    main()