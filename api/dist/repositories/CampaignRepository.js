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
exports.CampaignRepository = void 0;
const typeorm_1 = require("typeorm");
const Campaign_1 = require("../entity/Campaign");
const NotFoundException_1 = require("../exceptions/NotFoundException");
let CampaignRepository = class CampaignRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.listCampaigns = (userId, filter) => __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.createQueryBuilder();
            const all = yield queryBuilder
                .select()
                .take(filter.perPage)
                .skip((filter.page - 1) * filter.perPage)
                .orderBy(filter.sort.field, filter.sort.direction)
                .where({ user_id: userId })
                .getMany();
            return all;
        });
        this.createCampaign = (data) => __awaiter(this, void 0, void 0, function* () {
            const campaign = this.create();
            const source = yield this.getSourceFromName(String(data.source));
            console.log(source);
            campaign.beginDate = data.beginDate;
            campaign.endDate = data.endDate;
            campaign.investment = data.investment;
            campaign.revenues = data.revenues;
            campaign.link = data.link;
            campaign.name = data.name;
            campaign.source_id = source.id;
            campaign.user_id = data.user_id;
            return this.save(campaign);
        });
    }
    getCampaignById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne(id);
        });
    }
    updateCampaign(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.findOne(id);
            const source = yield this.getSourceFromName(String(data.source));
            if (!campaign)
                throw new NotFoundException_1.NotFoundException('Campanha não encontrada');
            campaign.beginDate = data.beginDate;
            campaign.endDate = data.endDate;
            campaign.investment = data.investment;
            campaign.revenues = data.revenues;
            campaign.link = data.link;
            campaign.name = data.name;
            campaign.source_id = source.id;
            return yield this.save(campaign);
        });
    }
    deleteCampaign(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(id);
        });
    }
    getInvestiment(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = (0, typeorm_1.getManager)();
            const rawData = yield manager.query(`
            SELECT sum(investment) as investiment 
              FROM campaign
            WHERE user_id = ?`, [userId]);
            const row = rawData[0];
            console.log(row.investiment);
            return Number(row.investiment);
        });
    }
    getRevenue(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = (0, typeorm_1.getManager)();
            const rawData = yield manager.query(`
            SELECT sum(revenues) as revenues 
              FROM campaign
              WHERE user_id = ?`, [userId]);
            const row = rawData[0];
            return Number(row.revenues);
        });
    }
    getSourceFromName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = (0, typeorm_1.getManager)();
            const rawData = yield manager.query(`
            SELECT * FROM source
              WHERE name = ?`, [name]);
            return rawData[0];
        });
    }
};
CampaignRepository = __decorate([
    (0, typeorm_1.EntityRepository)(Campaign_1.Campaign)
], CampaignRepository);
exports.CampaignRepository = CampaignRepository;
