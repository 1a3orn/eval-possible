import { loopFactory } from "../../loop-factory";
import { DataTracker } from "../../DataTracker";

import { viewBy } from "./view-by";

export const viewLoop = async (tracker: DataTracker) => {
  const options = [
    {
      title: "View with highest value on top",
      fnc: async () => viewBy(tracker, (a, b) => b.elo - a.elo),
    },
    {
      title: "View with lowest time on top",
      fnc: async () => viewBy(tracker, (a, b) => a.time - b.time),
    },
    { title: "Exit View Mode", fnc: async () => "EXIT" },
  ];
  await loopFactory({ options })();
};
