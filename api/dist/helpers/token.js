"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const secret = 'mentoria-eduzz-dio';
const generate = (email) => {
    const hash = crypto_js_1.default.AES.encrypt(email, secret).toString();
    return hash;
};
const validate = (token) => {
    const decrypt = crypto_js_1.default.AES.decrypt(token, secret);
    const email = decrypt.toString(crypto_js_1.default.enc.Utf8);
    return email;
};
exports.Token = {
    generate,
    validate
};
