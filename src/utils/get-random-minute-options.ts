import { map, flatMap, sample } from "lodash";

export type RandomTimesConfig = {
  bases: number[];
  powers: number[];
  until: number;
};

export const getRandomMinuteOptions = () =>
  sample(getPotentialOptions()) || [5, 10, 20, 40, 80];

const getPotentialOptions = (
  { bases, powers, until }: RandomTimesConfig = {
    bases: [4, 5, 6],
    powers: [1.5, 1.75, 2, 2.25],
    until: 8 * 60 * 7 * 104,
  }
) =>
  flatMap(bases, (base) =>
    map(powers, (power) => getOption({ base, power, until }))
  );

const getOption = ({
  base,
  power,
  until,
}: {
  base: number;
  power: number;
  until: number;
}) => {
  let i = 0;
  let num = 0;
  const options = [];
  do {
    num = Math.round(base * Math.pow(power, i));
    options.push(num);
    i++;
  } while (num < until);
  return options;
};
