import prompts from "prompts";

import { getTextPrompt } from "../../prompt-helpers";
import { getTimeDisplayValue } from "../../utils";
import { DataTracker } from "../../DataTracker";

export const editIndividual = async (tracker: DataTracker, id: string) => {
  let looping = true;
  while (looping) {
    await tracker.edit(id, async (data) => {
      const choice = await prompts({
        type: "select",
        name: "choice",
        initial: 0,
        message: `
        \n\n\n
        Name: ${data.name}
        Description: ${data.description}
        Elo: ${data.elo}
        Time Estimated: ${getTimeDisplayValue(data.time, {
          hoursInDay: 7,
          daysInWeek: 5,
        })}
        Notes: ${data.notes
          .map((x) => `\n${x.createdAt}: ${x.text}`)
          .join("\n")}
        `,
        choices: [
          { value: "edit-name", title: "Change Name" },
          { value: "edit-description", title: "Change Description" },
          { value: "add-note", title: "Add Note" },
          { value: "exit", title: "Exit" },
        ],
      });
      if (choice.choice === "exit") {
        looping = false;
        return data;
      } else if (choice.choice === "edit-name") {
        const newName = await prompts(
          getTextPrompt("name", "What is the new name?")
        );
        return { ...data, name: newName.name as string };
      } else if (choice.choice === "edit-description") {
        const newDescription = await prompts(
          getTextPrompt("description", "What is the new description?")
        );
        return { ...data, description: newDescription.description as string };
      } else if (choice.choice === "add-note") {
        const newText = await prompts(
          getTextPrompt("note", "What is the new new text?")
        );
        return {
          ...data,
          notes: data.notes.concat({
            id: Math.random().toString(),
            createdAt: new Date().toString(),
            text: newText.note as string,
          }),
        };
      } else {
        return data;
      }
    });
  }
};
