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
const jwt = __importStar(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const UserRepository_1 = require("../repositories/UserRepository");
const QueueService_1 = __importDefault(require("./QueueService"));
class LoginService {
    constructor(userRepository, queueService) {
        this.userRepository = userRepository;
        this.queueService = queueService;
        this.sendResetPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserByEmail(email);
            if (!user)
                throw new NotFoundException_1.NotFoundException('Usuário não encontrado');
            return yield this.queueService.sendResetPasswordToQueue({ id: user.id, name: user.name, email: user.email });
        });
        this.sendEmailConfirmation = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserByEmail(email);
            if (!user)
                throw new NotFoundException_1.NotFoundException('Usuário não encontrado');
            return yield this.queueService.sendEmailConfirmationToQueue({ user_token: user.user_token, email: user.email });
        });
    }
    doUserLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserByCredentials(username, password);
            if (!user)
                throw new NotFoundException_1.NotFoundException('User not found');
            const newToken = jwt.sign({ id: user.id, name: user.name, email: user.email, email_validated: user.email_validated }, '123', {
                expiresIn: 3600
            });
            return newToken;
        });
    }
}
exports.default = new LoginService((0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository), QueueService_1.default);
