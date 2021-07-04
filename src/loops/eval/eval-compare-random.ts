
import {  randomSample } from "../../utils";
import { DataTracker } from "../../DataTracker";
import { Possible } from "../../types";

import { evalCompareSpecific  } from "./eval-compare-specific";

const getRandomId = (data: Possible[]) => {
  const max = Math.max(...data.map((x) => x.eloChanges.length));
  return randomSample(
    data.map((x) => ({
      value: x.id,
      weight: 2 + max - x.eloChanges.length,
    }))
  );
};

const newBase = () => ({
  id: Math.random().toString(),
  createdAt: new Date().toString(),
});

export const evalCompareRandom = async (tracker: DataTracker) => {
  const all = tracker.getAll();

  const oneId = getRandomId(all);
  const twoId = getRandomId(all.filter((x) => x.id !== oneId));

  const one = all.find((x) => x.id === oneId)!;
  const two = all.find((x) => x.id === twoId)!;
  return evalCompareSpecific(tracker, one, two);
};


