import { getRandomMinuteOptions, getTimeDisplayValue } from "../utils";

export const getTimePrompt = (propName: string) => {
  const minutes = getRandomMinuteOptions();
  return {
    type: "select" as const,
    name: propName,
    message: "Estimate an amount of time it will take to complete.",
    initial: 0,
    choices: minutes.map((minute) => ({
      value: minute,
      title: getTimeDisplayValue(minute, { hoursInDay: 8, daysInWeek: 5 }),
    })),
  };
};
