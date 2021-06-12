import fs from "fs";

import { Possible } from "../types";
import { possiblesSchema } from "../schema";

export const getDataFromPath = (path: string): Possible[] => {
  const dataString = fs.readFileSync(path, { encoding: "utf-8" });
  const data = JSON.parse(dataString);
  try {
    return possiblesSchema.parse(data);
  } catch (e) {
    throw new Error("Failed to match schema");
  }
};

export const writeDataToPath = (path: string, data: Possible[]) => {
  fs.writeFileSync(path, JSON.stringify(data));
};
