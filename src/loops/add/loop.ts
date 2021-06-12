import prompts from "prompts";

import { getTextPrompt, getTimePrompt } from "../../prompt-helpers";
import { DataTracker, NewPossible } from "../../DataTracker";

type Choice = "save-end" | "save-again" | "trash-end" | "trash-again";

const getOptions = async () =>
  (await prompts([
    getTextPrompt("name", "What is the name for the possible"),
    getTextPrompt("description", "Can you describe the possible?"),
    getTimePrompt("time"),
  ])) as NewPossible;

const getCommandOptions = async (potential: NewPossible) => {
  const response = await prompts({
    type: "select",
    name: "choice",
    message: `
        New Possible:
        Name: ${potential.name}
        Description: ${potential.description}
        Estimated Time: ${potential.time}
    
        What do you want to do?
    `,
    choices: [
      { value: "save-end", title: "Save and exit add mode" },
      { value: "save-again", title: "Save and make another possible" },
      { value: "trash-end", title: "Trash and exit add mode" },
      { value: "trash-again", title: "Trash ann make another possible" },
    ],
  });
  return response.choice as Choice;
};

export const addLoop = async (tracker: DataTracker) => {
  let looping = true;
  while (looping) {
    console.log("\x1Bc");
    const options = await getOptions();
    const commandOpts = await getCommandOptions(options);
    switch (commandOpts) {
      case "save-again":
        await tracker.addNew(options);
        break;
      case "save-end":
        await tracker.addNew(options);
        looping = false;
        break;
      case "trash-again":
        break;
      case "trash-end":
        looping = false;
        break;
    }
  }
};
