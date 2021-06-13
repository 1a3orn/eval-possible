import prompts from "prompts";

type Option = {
  title: string;
  description?: string;
  fnc: () => Promise<any>;
};

type LoopFactoryArgs = {
  prompt?: string;
  options: Option[];
};

export const loopFactory = ({
  prompt = "What do you want to do?",
  options,
}: LoopFactoryArgs) => async () => {
  let looping = true;
  const promptChoices = options.map((x, i) => ({
    value: `${i}`,
    title: x.title,
    description: x.description,
  }));
  while (looping) {
    console.log("\x1Bc");
    const choice = await prompts({
      type: "select",
      name: "choice",
      message: prompt,
      choices: promptChoices,
    });
    const fnc = options[Number(choice.choice)].fnc;
    const val = await fnc();
    if (val === "EXIT") {
      looping = false;
    }
  }
};
