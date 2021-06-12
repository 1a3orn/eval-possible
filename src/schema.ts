import { z } from "zod";

export const statusSchema = z.enum([
  "ACTIVE",
  "IN_PROGRESS",
  "FINISHED",
  "REMOVED",
]);

const baseSchema = {
  id: z.string(),
  createdAt: z.string(),
};

const statusChangeSchema = z.object({
  ...baseSchema,
  before: statusSchema,
  after: statusSchema,
});

const timeChangeSchema = z.object({
  ...baseSchema,
  estimate: z.number(),
  before: z.number(),
  after: z.number(),
});

const eloChangeSchema = z.object({
  ...baseSchema,
  comparedToId: z.string(),
  result: z.enum(["victor", "loss"]),
  before: z.number(),
  after: z.number(),
});

export const possibleSchema = z
  .object({
    ...baseSchema,
    name: z.string(),
    description: z.string(),
    status: statusSchema,
    statusChanges: z.array(statusChangeSchema),
    elo: z.number(),
    eloChanges: z.array(eloChangeSchema),
    time: z.number(),
    timeChanges: z.array(timeChangeSchema),
  })
  .required();

export const possiblesSchema = z.array(possibleSchema);
