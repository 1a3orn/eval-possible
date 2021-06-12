import { possiblesSchema } from "../schema";
import { Possible } from "../types";

import { getDataFromPath, writeDataToPath } from "./get-and-save";
import { NewPossible } from "./types";

export class DataTracker {
  public path: string;

  public data: Possible[];

  constructor(path: string) {
    this.path = path;
    this.data = getDataFromPath(path);
    console.log("Loaded data");
  }

  public save() {
    writeDataToPath(this.path, this.data);
  }

  public addNew(x: NewPossible) {
    const withAdded = this.getAll().concat({
      id: Math.random().toString(),
      createdAt: new Date().toString(),
      status: "ACTIVE" as const,
      statusChanges: [],
      name: x.name,
      description: x.description,

      elo: 400,
      eloChanges: [],

      time: x.time,
      timeChanges: [
        {
          id: Math.random().toString(),
          createdAt: new Date().toString(),
          estimate: x.time,
          before: x.time,
          after: x.time,
        },
      ],
    });
    this.changeAll(withAdded);
  }

  public getAll() {
    return JSON.parse(JSON.stringify(this.data)) as Possible[];
  }

  public changeAll(data: Possible[]) {
    this.data = possiblesSchema.parse(data);
    this.save();
  }

  public edit(id: string, cb: (data: Possible) => Possible) {
    const data = this.getAll();
    const found = data.find((x) => x.id === id);
    const filtered = data.filter((x) => x.id !== id);
    if (found) {
      this.changeAll(filtered.concat(cb(found)));
    } else {
      throw new Error("Could not find with that id");
    }
  }
}
