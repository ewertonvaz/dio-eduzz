"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const helpers_1 = require("../helpers");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.getUserByCredentials = (username, password) => __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ email: username, password });
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne(id);
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ email });
        });
        this.createUser = (data) => __awaiter(this, void 0, void 0, function* () {
            const user = this.create();
            user.name = data.name;
            user.email = data.email;
            user.password = data.password;
            user.user_token = helpers_1.Token.generate(data.email);
            return yield user.save();
        });
        this.updatePassword = (id, password) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(id);
            user.password = password;
            return yield user.save();
        });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(User_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
