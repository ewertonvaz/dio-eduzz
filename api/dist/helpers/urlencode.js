"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncode = void 0;
const urlEncode = (str) => {
    str = str + '';
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/~/g, '%7E')
        .replace(/%20/g, '+');
};
exports.urlEncode = urlEncode;
