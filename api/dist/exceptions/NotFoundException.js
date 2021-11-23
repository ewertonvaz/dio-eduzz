"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const MainError_1 = require("./MainError");
class NotFoundException extends MainError_1.MainError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
    toJSON() {
        return {
            name: this.name,
            code: this.statusCode,
            message: this.message
        };
    }
}
exports.NotFoundException = NotFoundException;
