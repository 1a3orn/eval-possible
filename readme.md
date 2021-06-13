## Intro

Many people have 1000s of ideas and time to execute only 10s of them. Usually, people decide which to execute through informal, non-rigorous methods. This can lead to regret, uncertainty about what one is doing, akrasia when attempting to execute things, and so on.

To solve this, I introduce eval-possible. Eval-possible is a pre-todo list. Whenever you have an idea, you enter it into the system. In idle moments, you can compare the idea to other ideas (to see which you would prefer executing) and estimate how long it would take.

The system then uses a standard elo rating to rank possibilities.

## Installation

1. `npm install`
   2 Create a `data.json` file in the top level, with `[]` as contents.
2. `node run dev`
3. You probably want to get > 5 ideas in the system before you start comparing.

## Implementation Details

Todo
