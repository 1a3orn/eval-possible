import { masterLoop } from "./master-loop";

export const start = () => masterLoop({ path: process.argv[2] });
