import prompts from "prompts";

import { DataTracker } from "../../DataTracker";
import { viewBy } from "./view-by";

type Choice = "view-value-high" | "view-time-low" | "end";

const getCommandOptions = async () => {
  const response = await prompts({
    type: "select",
    name: "choice",
    message: `What do you want to do?`,
    choices: [
      { value: "view-value-high", title: "View with highest value on top" },
      { value: "view-time-low", title: "View with lowest time on top" },
      { value: "end", title: "Exit View Mode" },
    ],
  });
  return response.choice as Choice;
};

export const viewLoop = async (tracker: DataTracker) => {
  let looping = true;
  while (looping) {
    const commandOpts = await getCommandOptions();
    switch (commandOpts) {
      case "view-value-high":
        await viewBy(tracker, (a, b) => b.elo - a.elo);
        break;
      case "view-time-low":
        await viewBy(tracker, (a, b) => a.time - b.time);
        break;
      case "end":
        looping = false;
        break;
    }
  }
};
