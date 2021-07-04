import prompts from "prompts";
import { sum } from "lodash";

import {
  getRandomMinuteOptions,
  getTimeDisplayValue,
  randomSample,
} from "../../utils";
import { DataTracker } from "../../DataTracker";

export const evalTime = async (tracker: DataTracker) => {
  let looping = true;

  const all = tracker.getAll();

  const maxEvals = Math.max(...all.map((x) => x.timeChanges.length));
  const chosenId = randomSample(
    tracker.getAll().map((x) => ({
      value: x.id,
      weight: 2 + maxEvals - x.timeChanges.length,
    }))
  );

  await tracker.edit(chosenId, async (data) => {
    const minutes = getRandomMinuteOptions();
    const options = minutes.map((minute) => ({
      value: minute,
      title: getTimeDisplayValue(minute, { hoursInDay: 8, daysInWeek: 5 }),
    }));
    const choice = await prompts({
      type: "select",
      name: "choice",
      initial: 0,
      message: `
        \n\n\n
        Name: ${data.name}
        Description: ${data.description}
        Notes: ${data.notes
          .map((x) => `\n${x.createdAt}: ${x.text}`)
          .join("\n")}
        
        
        How long do you think this will take to do?
        `,
      choices: [{ value: -1, title: "Stop" }].concat(options),
    });
    if (choice.choice === -1) {
      looping = false;
      return data;
    } else {
      const estimate = choice.choice as number;
      const before = data.time;
      const after = Math.round(
        sum(data.timeChanges.map((x) => x.estimate).concat(estimate)) /
          (data.timeChanges.length + 1)
      );
      const newTimeChange = {
        id: Math.random().toString(),
        createdAt: new Date().toString(),
        estimate,
        before,
        after,
      };
      const newData = {
        ...data,
        time: after,
        timeChanges: data.timeChanges.concat(newTimeChange),
      };
      return newData;
    }
  });

  return looping;
};
