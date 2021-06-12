import prompts from "prompts";
import { DataTracker } from "../../DataTracker";
import { Possible } from "../../types";

export const viewBy = async (
  tracker: DataTracker,
  sortFnc: (a: Possible, b: Possible) => number
) => {
  const all = tracker.getAll();
  all.sort(sortFnc);
  const options = all.map((x) => ({
    title: `${x.elo} \t ${x.time} \t ${x.name}`,
    value: x.id,
  }));
  const exitOption = { title: "Exit View", value: "exit" };

  const choice = await prompts({
    type: "select",
    name: "choice",
    initial: 0,
    message: "Choose an option.",
    choices: [exitOption].concat(options).concat(exitOption),
  });
};
