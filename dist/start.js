"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const master_loop_1 = require("./master-loop");
const start = () => master_loop_1.masterLoop({ path: process.argv[2] });
exports.start = start;
