export type Possible = {
  id: string;
  createdAt: string;

  name: string;
  description: string;

  status: "ACTIVE" | "IN_PROGRESS" | "FINISHED" | "REMOVED";

  elo: number;
  eloChanges: EloChange[];

  time: number;
  timeChanges: TimeChange[];

  statusChanges: StatusChange[];
};

export type EloChange = {
  id: string;
  createdAt: string;

  comparedToId: string;
  result: "victor" | "loss";
  before: number;
  after: number;
};

export type TimeChange = {
  id: string;
  createdAt: string;

  estimate: number;
  before: number;
  after: number;
};

export type StatusChange = {
  id: string;
  createdAt: string;

  before: "ACTIVE" | "IN_PROGRESS" | "FINISHED" | "REMOVED";
  after: "ACTIVE" | "IN_PROGRESS" | "FINISHED" | "REMOVED";
};
