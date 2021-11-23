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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const UserRepository_1 = require("../repositories/UserRepository");
const validateToken_1 = require("../validators/validateToken");
const helpers_1 = require("../helpers");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(id);
            return user;
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.createUser(data);
            return user;
        });
    }
    updatePassword(password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenDecoded = yield (0, validateToken_1.checkTokenIsValid)(token);
            const user = yield this.userRepository.updatePassword(tokenDecoded.id, password);
            return user;
        });
    }
    confirmEmail(user_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedEmail = helpers_1.Token.validate(user_token);
            const user = yield this.userRepository.getUserByEmail(decodedEmail);
            if (!!user && user.user_token === user_token) {
                user.email_validated = true;
                user.save();
                return true;
            }
            return false;
        });
    }
}
exports.default = new UserService((0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository));
