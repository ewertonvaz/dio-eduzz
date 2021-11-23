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
const jwt = __importStar(require("jsonwebtoken"));
const amqplib_1 = require("amqplib");
const settings_1 = require("../settings");
const helpers_1 = require("../helpers");
class QueueService {
    constructor() {
        this.getConnection = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                this.connection = yield (0, amqplib_1.connect)(settings_1.RABBIT_DSN);
            }
            return this.connection;
        });
        this.getChannel = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                const conn = yield this.getConnection();
                this.channel = yield conn.createChannel();
            }
            return this.channel;
        });
        this.sendToQueue = (queue, data) => __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.getChannel();
            return channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        });
        this.sendResetPasswordToQueue = (data) => __awaiter(this, void 0, void 0, function* () {
            const newToken = jwt.sign({ id: data.id, name: data.name, email: data.email }, '123', {
                expiresIn: 3600
            });
            const link = `http://localhost:3000/nova-senha?t=${newToken}`;
            return yield this.sendToQueue('user.password.reset', Object.assign(Object.assign({}, data), { link }));
        });
        this.sendEmailConfirmationToQueue = (data) => __awaiter(this, void 0, void 0, function* () {
            const userToken = data.user_token;
            const link = `http://localhost:3000/confirm-email/${(0, helpers_1.urlEncode)(userToken)}`;
            return yield this.sendToQueue('user.password.confirmation', Object.assign(Object.assign({}, data), { link }));
        });
    }
}
exports.default = new QueueService();
