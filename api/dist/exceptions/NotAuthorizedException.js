"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedException = void 0;
const MainError_1 = require("./MainError");
class NotAuthorizedException extends MainError_1.MainError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
    toJSON() {
        return {
            name: this.name,
            code: this.statusCode,
            message: this.message
        };
    }
}
exports.NotAuthorizedException = NotAuthorizedException;
