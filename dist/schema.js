"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.possiblesSchema = exports.possibleSchema = exports.statusSchema = void 0;
const zod_1 = require("zod");
exports.statusSchema = zod_1.z.enum([
    "ACTIVE",
    "IN_PROGRESS",
    "FINISHED",
    "REMOVED",
]);
const baseSchema = {
    id: zod_1.z.string(),
    createdAt: zod_1.z.string(),
};
const statusChangeSchema = zod_1.z.object(Object.assign(Object.assign({}, baseSchema), { before: exports.statusSchema, after: exports.statusSchema }));
const timeChangeSchema = zod_1.z.object(Object.assign(Object.assign({}, baseSchema), { estimate: zod_1.z.number(), before: zod_1.z.number(), after: zod_1.z.number() }));
const eloChangeSchema = zod_1.z.object(Object.assign(Object.assign({}, baseSchema), { comparedToId: zod_1.z.string(), result: zod_1.z.enum(["victor", "loss"]), before: zod_1.z.number(), after: zod_1.z.number() }));
exports.possibleSchema = zod_1.z
    .object(Object.assign(Object.assign({}, baseSchema), { name: zod_1.z.string(), description: zod_1.z.string(), status: exports.statusSchema, statusChanges: zod_1.z.array(statusChangeSchema), elo: zod_1.z.number(), eloChanges: zod_1.z.array(eloChangeSchema), time: zod_1.z.number(), timeChanges: zod_1.z.array(timeChangeSchema) }))
    .required();
exports.possiblesSchema = zod_1.z.array(exports.possibleSchema);
