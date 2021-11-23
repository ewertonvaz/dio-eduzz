"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainError = void 0;
class MainError extends Error {
    constructor(message) {
        super();
        this.statusCode = 500;
        this.message = message;
        this.name = "Error";
    }
}
exports.MainError = MainError;
