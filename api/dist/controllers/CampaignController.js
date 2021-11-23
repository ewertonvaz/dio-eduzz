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
const campaingService_1 = __importDefault(require("../services/campaingService"));
class CampaignController {
    constructor(campaignService) {
        this.campaignService = campaignService;
        this.sanitizeFilter = (req) => {
            const { page, perPage, sort } = req.query;
            const { field, direction } = JSON.parse(sort.toString());
            const filter = {
                page: Number(page),
                perPage: Number(perPage),
                sort: {
                    field,
                    direction: direction.toUpperCase()
                }
            };
            const mapSortFilterFields = [
                { incoming: "beginDate", to: "begin_date" },
                { incoming: "endDate", to: "end_date" }
            ];
            if (mapSortFilterFields.some(x => x.incoming == filter.sort.field)) {
                filter.sort.field = mapSortFilterFields.filter(map => map.incoming === filter.sort.field).pop().to;
            }
            return filter;
        };
        this.getAllCampaigns = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const filter = this.sanitizeFilter(req);
            const campaigns = yield this.campaignService.getAllCampaigns(res.locals.user_id, filter);
            return res.json(campaigns);
        });
        this.getCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.campaignService.getCampaign(Number(req.params['id']));
            return res.json(campaign);
        });
        this.saveCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign(Object.assign({}, req.body), { user_id: res.locals.user_id });
            const campaign = yield this.campaignService.saveCampaign(data);
            return res.json(campaign);
        });
        this.updateCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params['id']);
            const campaign = yield this.campaignService.updateCampaign(id, req.body);
            return res.json(campaign);
        });
        this.deleteCampaign = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params['id']);
            const campaign = yield this.campaignService.deleteCampaign(id);
            return res.json(campaign);
        });
        this.getInvestiment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const total = yield this.campaignService.getInvestiment(res.locals.user_id);
            return res.send(total.toString());
        });
        this.getRevenue = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const total = yield this.campaignService.getRevenue(res.locals.user_id);
            return res.send(total.toString());
        });
        this.getROI = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const roi = yield this.campaignService.getROI(res.locals.user_id);
            return res.send(roi.toString());
        });
    }
}
exports.default = new CampaignController(campaingService_1.default);
