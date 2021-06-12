"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterLoop = void 0;
const DataTracker_1 = require("./DataTracker");
const masterLoop = ({ path = "./data.json" }) => {
    console.log("!W!W");
    const tracker = new DataTracker_1.DataTracker(path);
};
exports.masterLoop = masterLoop;
