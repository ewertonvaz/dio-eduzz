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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const amqplib_1 = require("amqplib");
const settings_1 = require("./settings");
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(settings_1.SENDGRID_TOKEN);
var connection = undefined;
var channel = undefined;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)();
    Promise.resolve().then(() => __importStar(require('./app')));
    connection = yield (0, amqplib_1.connect)(settings_1.RABBIT_DSN);
    channel = yield connection.createChannel();
    channel.assertQueue('user.password.reset');
    channel.assertQueue('user.password.confirmation');
    channel.prefetch(1);
    channel.consume('user.password.reset', resetMsg, { noAck: false });
    channel.consume('user.password.confirmation', confirmMsg, { noAck: false });
}))();
const resetMsg = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg)
        return;
    const json = msg.content.toString() || '';
    const { name, email, link } = JSON.parse(json);
    const body = {
        to: `${name} <${email}>`,
        from: 'ewerton.vaz@gmail.com',
        subject: 'Recuperacao de senha',
        html: `<p>Olá... acesse o link abaixo para resetar a sua senha</p>
               <p><a href='${link}'>${link}</a></p>`,
    };
    try {
        yield mail_1.default.send(body);
        channel.ack(msg);
    }
    catch (err) {
        console.log(err.response.body);
        channel.nack(msg);
    }
});
const confirmMsg = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg)
        return;
    const json = msg.content.toString() || '';
    const { name, email, link } = JSON.parse(json);
    const body = {
        to: `${name} <${email}>`,
        from: 'ewerton.vaz@gmail.com',
        subject: 'Confirmacao de senha',
        html: `<p>Olá... Seja bem vindo(a) ao sistema</p>
               <p>Mas... por favor acesse o link abaixo para confirmar a sua senha</p>
               <p><a href='${link}'>${link}</a></p>`,
    };
    try {
        yield mail_1.default.send(body);
        channel.ack(msg);
    }
    catch (err) {
        console.log(err.response.body);
        channel.nack(msg);
    }
});
