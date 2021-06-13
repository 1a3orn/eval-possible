import { DataTracker } from "./DataTracker";

import { loopFactory } from "./loop-factory";
import { addLoop, viewLoop, evalLoop } from "./loops";

export const masterLoop = async ({
  path = "./data.json",
}: {
  path?: string;
}) => {
  const tracker = new DataTracker(path);
  const options = [
    {
      title: "Add a possible",
      description: "Add a thing you might wish to do in the future.",
      fnc: async () => addLoop(tracker),
    },
    {
      title: "Evaluate possibles",
      description: "Compare the things you might want to do",
      fnc: async () => evalLoop(tracker),
    },
    {
      title: "View possibles",
      description: "View and edit details of things you might want to do",
      fnc: async () => viewLoop(tracker),
    },
    {
      title: "Exit Program",
      description: "Save changes and exit this program",
      fnc: async () => "EXIT",
    },
  ];
  await loopFactory({ options })();
};
