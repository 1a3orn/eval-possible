import { DataTracker } from "../../DataTracker";

import { evalTime } from "./eval-time";
import { evalCompareRandom } from "./eval-compare-random";

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