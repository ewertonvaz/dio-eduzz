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
const CampaignRepository_1 = require("../repositories/CampaignRepository");
class CampaignService {
    constructor(campaignRepository) {
        this.campaignRepository = campaignRepository;
        this.getAllCampaigns = (userId, filter) => __awaiter(this, void 0, void 0, function* () {
            const campaigns = yield this.campaignRepository.listCampaigns(userId, filter);
            return {
                total: campaigns.length,
                result: campaigns
            };
        });
        this.getCampaign = (id) => __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.campaignRepository.getCampaignById(id);
            return campaign;
        });
        this.saveCampaign = (data) => __awaiter(this, void 0, void 0, function* () {
            const { id } = data;
            const campaign = (!id) ?
                yield this.createCampaign(data) :
                yield this.updateCampaign(data.id, data);
            return campaign;
        });
        this.createCampaign = (data) => __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.campaignRepository.createCampaign(data);
            return campaign;
        });
        this.updateCampaign = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.campaignRepository.updateCampaign(id, data);
            return campaign;
        });
        this.deleteCampaign = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.campaignRepository.deleteCampaign(id);
            return result;
        });
        this.getInvestiment = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.campaignRepository.getInvestiment(userId);
            return result;
        });
        this.getRevenue = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.campaignRepository.getRevenue(userId);
            return result;
        });
        this.getROI = (userId) => __awaiter(this, void 0, void 0, function* () {
            const revenue = yield this.campaignRepository.getRevenue(userId);
            const investiment = yield this.campaignRepository.getInvestiment(userId);
            return revenue > 0 ? Number((revenue - investiment) / investiment) : 0;
        });
    }
}
exports.default = new CampaignService((0, typeorm_1.getCustomRepository)(CampaignRepository_1.CampaignRepository));
