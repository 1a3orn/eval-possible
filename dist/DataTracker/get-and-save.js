"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDataToPath = exports.getDataFromPath = void 0;
const fs_1 = __importDefault(require("fs"));
const schema_1 = require("../schema");
const getDataFromPath = (path) => {
    const dataString = fs_1.default.readFileSync(path, { encoding: "utf-8" });
    const data = JSON.parse(dataString);
    try {
        return schema_1.possiblesSchema.parse(data);
    }
    catch (e) {
        throw new Error("Failed to match schema");
    }
};
exports.getDataFromPath = getDataFromPath;
const writeDataToPath = (path, data) => {
    fs_1.default.writeFileSync(path, data.toString());
};
exports.writeDataToPath = writeDataToPath;
