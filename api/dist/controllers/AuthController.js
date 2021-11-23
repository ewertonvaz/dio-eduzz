"use strict";
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
const loginService_1 = __importDefault(require("../services/loginService"));
const userService_1 = __importDefault(require("../services/userService"));
class AuthController {
    constructor(userService, loginService) {
        this.userService = userService;
        this.loginService = loginService;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newToken = yield this.loginService.doUserLogin(req.body.email, req.body.password);
                return res.json({
                    token: newToken
                });
            }
            catch (err) {
                res.status(401).json({
                    message: "Usuário não encontrado"
                });
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.createUser(req.body);
                return res.json(user);
            }
            catch (err) {
                next(err);
            }
        });
        this.profile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.user_id || undefined;
            const profile = yield this.userService.getProfile(userId);
            return res.json(profile);
        });
        this.sendReset = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.loginService.sendResetPassword(email);
                return res.json(true);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, token } = req.body;
                yield this.userService.updatePassword(password, token);
                return res.json(true);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
        this.sendConfirmation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.loginService.sendEmailConfirmation(email);
                return res.json(true);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
        this.confirmEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_token } = req.body;
                const validated = yield this.userService.confirmEmail(user_token);
                if (validated == true)
                    res.status(200).json({ is_valid: true });
                else
                    res.status(200).json({ is_valid: false });
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
}
exports.default = new AuthController(userService_1.default, loginService_1.default);
