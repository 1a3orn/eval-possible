import prompts from "prompts";

import { getEloChanges } from "../../utils";
import { DataTracker } from "../../DataTracker";
import { Possible } from "../../types";

const newBase = () => ({
    id: Math.random().toString(),
    createdAt: new Date().toString(),
  });
  
export const evalCompareSpecific = async (tracker: DataTracker, one: Possible, two: Possible) => {
    const preference = await prompts({
        type: "select",
        name: "choice",
        initial: 0,
        message: `Completing which would be more awesome?`,
        choices: [{ value: "QUIT", title: "Quit" }].concat(
            [one, two].map((x) => ({
            value: x?.id,
            title: x?.name,
            description: x?.description,
            }))
        ),
    });

    if (preference.choice === "QUIT") {
        return false;
    }

    const oneWon = preference.choice === one.id;
    const twoWon = !oneWon;
    const { victorEloAfter, loserEloAfter } = getEloChanges({
        victorElo: oneWon ? one.elo : two.elo,
        loserElo: twoWon ? one.elo : two.elo,
        victorComparisons: oneWon ? one.eloChanges.length : two.eloChanges.length,
        loserComparisons: twoWon ? one.eloChanges.length : two.eloChanges.length,
    });

    await tracker.edit(one.id, async (data) => {
        const newElo = oneWon ? victorEloAfter : loserEloAfter;
        return {
            ...data,
            elo: newElo,
            eloChanges: data.eloChanges.concat({
            ...newBase(),
            comparedToId: two.id,
            before: data.elo,
            after: newElo,
            result: oneWon ? "victor" : "loss",
            }),
        };
    });

    await tracker.edit(two.id, async (data) => {
        const newElo = twoWon ? victorEloAfter : loserEloAfter;
        return {
            ...data,
            elo: newElo,
            eloChanges: data.eloChanges.concat({
            ...newBase(),
            comparedToId: one.id,
            before: data.elo,
            after: newElo,
            result: twoWon ? "victor" : "loss",
            }),
        };
    });

    return true;
}