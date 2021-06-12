import prompts from "prompts";

import { DataTracker } from "./DataTracker";
import { addLoop, viewLoop, evalLoop } from "./loops";

const promptOptions = [
  {
    value: "add",
    title: "Add a possible",
    description: "Add a thing you might wish to do in the future.",
  },
  {
    value: "eval",
    title: "Evaluate possibles",
    description: "Compare the things you might want to do",
  },
  {
    value: "view",
    title: "View possibles",
    description: "View and edit details of things you might want to do",
  },
  {
    value: "quit",
    title: "Exit Program",
    description: "Save changes and exit this program",
  },
];

const getOptions = async () =>
  (
    await prompts({
      type: "select",
      name: "value",
      message: "What would you like to do?",
      choices: promptOptions,
    })
  ).value as "add" | "eval" | "view" | "quit";

export const masterLoop = async ({
  path = "./data.json",
}: {
  path?: string;
}) => {
  const tracker = new DataTracker(path);
  let looping = true;
  console.log("\x1Bc");
  while (looping) {
    const choice = await getOptions();
    if (choice === "add") {
      await addLoop(tracker);
    } else if (choice === "eval") {
      await evalLoop(tracker);
    } else if (choice === "view") {
      await viewLoop(tracker);
    } else if (choice === "quit") {
      looping = false;
    }
  }
};
