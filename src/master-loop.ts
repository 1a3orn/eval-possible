import prompts from "prompts";

import { DataTracker } from "./DataTracker";
import { addLoop, viewLoop, evalLoop } from "./loops";

const mainPrompt = `
    What would you like to do?
    1. Add possible
    2. Compare / estimate possibles
    3. View possibles
    4. Quit
`;

const getOptions = async () => {
  const response = await prompts({
    type: "number",
    name: "value",
    message: mainPrompt,
    validate: (value) =>
      [1, 2, 3, 4].includes(value) ? true : "Must be 1, 2, 3, 4.",
  });
  return response.value as 1 | 2 | 3 | 4;
};

export const masterLoop = async ({
  path = "./data.json",
}: {
  path?: string;
}) => {
  const tracker = new DataTracker(path);
  let looping = true;
  while (looping) {
    const choice = await getOptions();
    if (choice === 1) {
      await addLoop(tracker);
    } else if (choice === 2) {
      await evalLoop(tracker);
    } else if (choice === 3) {
      await viewLoop(tracker);
    } else if (choice === 4) {
      looping = false;
    }
  }
};
