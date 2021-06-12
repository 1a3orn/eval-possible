import { DataTracker } from "../../DataTracker";

import { evalTime } from "./eval-time";
//import { evalCompare } from "./eval-compare";

export const evalLoop = async (tracker: DataTracker) => {
  let looping = true;
  while (looping) {
    const result = Math.random() > 0.5 ? "TIME" : "COMPARE";
    switch (result) {
      case "TIME":
        looping = await evalTime(tracker);
        break;
      case "COMPARE":
        //looping = await evalCompare(tracker);
        break;
    }
  }
};
