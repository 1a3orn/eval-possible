"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTracker = void 0;
const schema_1 = require("../schema");
const get_and_save_1 = require("./get-and-save");
class DataTracker {
    constructor(path) {
        this.path = path;
        this.data = get_and_save_1.getDataFromPath(path);
        console.log("Loaded data");
    }
    save() {
        get_and_save_1.writeDataToPath(this.path, this.data);
    }
    getAll() {
        return JSON.parse(JSON.stringify(this.data));
    }
    changeAll(data) {
        this.data = schema_1.possiblesSchema.parse(data);
        this.save();
    }
    edit(id, cb) {
        const data = this.getAll();
        const found = data.find((x) => x.id === id);
        const filtered = data.filter((x) => x.id !== id);
        if (found) {
            this.changeAll(filtered.concat(cb(found)));
        }
        else {
            throw new Error("Could not find with that id");
        }
    }
}
exports.DataTracker = DataTracker;
