import { DataTracker } from "../../DataTracker";

import { evalLoopRandom } from "./eval-loop-random";
import { evalLoopCompareAll } from "./eval-loop-compare-all";
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
      fnc: async () => evalLoopCompareAll(tracker),
    },
    {
      title: "Exit",
      fnc: async () => "EXIT",
    },
  ];
  await loopFactory({ options })();
};
