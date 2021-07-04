import { shuffle } from "lodash"

import { DataTracker } from "../../DataTracker";

import { evalCompareSpecific  } from "./eval-compare-specific";


export const evalCompareLoopAll = async (tracker: DataTracker) => {
  const all = tracker.getAll().map(x => ({...x}));

  const shuffled = shuffle(all);

  let looping = true;
  while(looping && shuffled.length >= 2) {
    console.log("\x1Bc")
    const one = shuffled.pop();
    const two = shuffled.pop();
    if (one && two) {
        looping = await evalCompareSpecific(tracker, one, two);
    }

  }

};


