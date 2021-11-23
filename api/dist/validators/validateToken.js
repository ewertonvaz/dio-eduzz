"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.checkTokenIsValid = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const NotAuthorizedException_1 = require("../exceptions/NotAuthorizedException");
const checkTokenIsValid = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, '123', (err, decoded) => {
            if (err)
                reject('Invalid token');
            resolve(decoded);
        });
    });
};
exports.checkTokenIsValid = checkTokenIsValid;
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            throw new NotAuthorizedException_1.NotAuthorizedException('Authorization token required');
        }
        const token = bearerToken.split(' ')[1];
        const decodedToken = yield (0, exports.checkTokenIsValid)(token);
        res.locals.user_id = decodedToken.user_id;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.validateToken = validateToken;
