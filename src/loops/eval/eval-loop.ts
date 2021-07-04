import { DataTracker } from "../../DataTracker";

import { evalTime } from "./eval-time";
import { evalCompareRandom } from "./eval-compare-random";
import { evalCompareLoopAll } from "./eval-compare-loop-all";
import { loopFactory } from "../../loop-factory";

export const evalLoop = async (tracker: DataTracker) => {
  const options = [
    {
      title: "Evaluate randomly",
      description: "Randomly compare or estimate time for a possible.  No set time.",
      fnc: async () => evalLoopRandom(tracker),
    },
    {
      title: "Compare all possibles once",
      description: "Compare the things you might want to do",
      fnc: async () => evalCompareLoopAll(tracker),
    },
    {
      title: "Exit",
      fnc: async () => "EXIT",
    },
  ];
  await loopFactory({ options })();
};

export const evalLoopRandom = async (tracker: DataTracker) => {
  let looping = true;
  while (looping) {
    console.log("\x1Bc");
    const result = Math.random() > 0.5 ? "TIME" : "COMPARE";
    switch (result) {
      case "TIME":
        looping = await evalTime(tracker);
        break;
      case "COMPARE":
        looping = await evalCompareRandom(tracker);
        break;
    }
  }
};