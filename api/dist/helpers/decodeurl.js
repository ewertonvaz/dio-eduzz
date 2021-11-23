"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeUrl = void 0;
const decodeUrl = (str) => {
    str = str + '';
    return decodeURIComponent(str)
        .replace('%21', '!')
        .replace('%27', "'")
        .replace('%28', '(')
        .replace('%29', ')')
        .replace('%2A', '*')
        .replace('%7E', '~')
        .replace('%20', '+');
};
exports.decodeUrl = decodeUrl;
