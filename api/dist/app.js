"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const validateRequest_1 = require("./validators/validateRequest");
const validateToken_1 = require("./validators/validateToken");
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const campaignController_1 = __importDefault(require("./controllers/campaignController"));
const postLoginValidator_1 = require("./validators/postLoginValidator");
const postUserValidator_1 = require("./validators/postUserValidator");
const postCampaignValidator_1 = require("./validators/postCampaignValidator");
const postSendResetValidator_1 = require("./validators/postSendResetValidator");
const postResetPasswordValidator_1 = require("./validators/postResetPasswordValidator");
const postUserTokenValidator_1 = require("./validators/postUserTokenValidator");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.post('/auth/create', (0, validateRequest_1.validateRequest)(postUserValidator_1.postUserValidator), AuthController_1.default.createUser);
app.post('/auth/login', (0, validateRequest_1.validateRequest)(postLoginValidator_1.postLoginValidator), AuthController_1.default.login);
app.post('/auth/send-reset', (0, validateRequest_1.validateRequest)(postSendResetValidator_1.postSendResetValidator), AuthController_1.default.sendReset);
app.post('/auth/reset-password', (0, validateRequest_1.validateRequest)(postResetPasswordValidator_1.postResetPasswordValidator), AuthController_1.default.resetPassword);
app.post('/auth/send-confirmation', (0, validateRequest_1.validateRequest)(postSendResetValidator_1.postSendResetValidator), AuthController_1.default.sendConfirmation);
app.post('/auth/confirm-email', (0, validateRequest_1.validateRequest)(postUserTokenValidator_1.postUserTokenValidator), AuthController_1.default.confirmEmail);
app.use(validateToken_1.validateToken);
app.get('/campaigns', campaignController_1.default.getAllCampaigns);
app.post('/campaigns', (0, validateRequest_1.validateRequest)(postCampaignValidator_1.postCampaignValidator), campaignController_1.default.saveCampaign);
app.delete('/campaign/:id', campaignController_1.default.deleteCampaign);
app.get('/campaigns/graphs/investment', campaignController_1.default.getInvestiment);
app.get('/campaigns/graphs/revenues', campaignController_1.default.getRevenue);
app.get('/campaigns/graphs/roi', campaignController_1.default.getROI);
app.use((error, req, res, _) => {
    var _a;
    const httpCode = error.statusCode || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
    if (error.toJSON) {
        error = error.toJSON();
    }
    return res.status(httpCode).json(error);
});
app.listen(8000, () => {
    console.log('Servidor ouvindo na porta 8000...');
});
