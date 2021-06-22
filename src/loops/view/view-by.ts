import prompts from "prompts";

import { DataTracker } from "../../DataTracker";
import { Possible } from "../../types";
import { editIndividual } from "./edit-individual";
import { getTimeDisplayValue } from "../../utils";

export const viewBy = async (
  tracker: DataTracker,
  sortFnc: (a: Possible, b: Possible) => number,
  filterFnc: (a: Possible) => boolean
) => {
  const all = tracker.getAll();
  all.sort(sortFnc);
  const options = all.filter(filterFnc).map((x) => ({
    title: `${x.status} \t ${x.elo} \t ${getTimeDisplayValue(x.time, {
      hoursInDay: 8,
      daysInWeek: 5,
    })} \t ${x.name}`,
    value: x.id,
  }));
  const exitOption = { title: "Exit View", value: "exit" };

  let looping = true;

  while (looping) {
    console.log("\x1Bc");
    const choice = await prompts({
      type: "select",
      name: "choice",
      initial: 0,
      message: "Choose an option.",
      choices: [exitOption].concat(options).concat(exitOption),
    });
    if (choice.choice === "exit") {
      looping = false;
    } else {
      await editIndividual(tracker, choice.choice as string);
    }
  }
};
