# Cantus Firmus Generator

Silly, but fun.

## Definitions
- Step = some kind of 2nd
- Skip = some kind of 3rd
- Leap = 4th or larger

## "Rules"

- Starts on tonic
- Ends on ^2 ^1 cadence
- Climax
  - Highest note only appears once
  - Is a consonant interval above the tonic
- All leaps are consonant (4th is consonant in this context)
- All outlines are consonant
- Leaps of a 5th or larger must be recovered with a step or skip in the
  opposite direction
- No trills (e.g. 5,4,5,4 or 2,3,2,3)

## TODOs

- Want to allow you to create a CF by moving notes around and running the check.
- Want to actually allow you to write 1st Species Counterpoint against the CF and check the rules as you go.
- Want to add a set of "well-known" CF (like e.g. the ones from Parnassum).
- Add modal CF.
- Add in browser play back.

## History

Originally written using python served via webassembly.

Currently running using SolidJS and Bootstrap