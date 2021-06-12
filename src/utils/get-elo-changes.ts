export const getEloChanges = ({
  victorElo,
  loserElo,
  victorComparisons,
  loserComparisons,
}: {
  victorElo: number;
  loserElo: number;
  victorComparisons: number;
  loserComparisons: number;
}) => {
  const victorEloAfter = eloChangedForOne(
    victorElo,
    loserElo,
    "ONE",
    getKFactor(victorComparisons)
  );
  const loserEloAfter = eloChangedForOne(
    loserElo,
    victorElo,
    "TWO",
    getKFactor(loserComparisons)
  );
  return { victorEloAfter, loserEloAfter };
};

const eloChangedForOne = (
  one: number,
  two: number,
  victor: "ONE" | "TWO",
  kFactor: number
) => {
  return Math.round(
    one +
      kFactor * ((victor === "ONE" ? 1 : 0) - expectedWinProbability(one, two))
  );
};

const SCALE_FACTOR = 400;
const expectedWinProbability = (one: number, two: number) =>
  1 / (1 + Math.pow(10, (two - one) / SCALE_FACTOR));

const MIN_K = 32;
const MAX_K = 64;
const COMPARISONS_TILL_MIN = 6;
const getKFactor = (comparisons: number) =>
  MIN_K + (MAX_K - MIN_K) * Math.max(0, 1 - comparisons / COMPARISONS_TILL_MIN);
