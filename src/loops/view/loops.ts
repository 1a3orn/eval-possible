import { loopFactory } from "../../loop-factory";
import { DataTracker } from "../../DataTracker";

import { viewBy } from "./view-by";

export const viewLoop = async (tracker: DataTracker) => {
  const options = [
    {
      title: "View active with highest value on top",
      fnc: async () =>
        viewBy(
          tracker,
          (a, b) => b.elo - a.elo,
          (a) => a.status === "ACTIVE"
        ),
    },
    {
      title: "View non-active with highest value on top",
      fnc: async () =>
        viewBy(
          tracker,
          (a, b) => b.elo - a.elo,
          (a) => a.status !== "ACTIVE"
        ),
    },
    {
      title: "View active with lowest time on top",
      fnc: async () =>
        viewBy(
          tracker,
          (a, b) => a.time - b.time,
          (a) => a.status === "ACTIVE"
        ),
    },
    {
      title: "View non-active with lowest time on top",
      fnc: async () =>
        viewBy(
          tracker,
          (a, b) => a.time - b.time,
          (a) => a.status !== "ACTIVE"
        ),
    },
    { title: "Exit View Mode", fnc: async () => "EXIT" },
  ];
  await loopFactory({ options })();
};
