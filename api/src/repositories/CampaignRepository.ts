import { EntityRepository, getManager, QueryBuilder, Repository, SelectQueryBuilder } from "typeorm";
import {Campaign} from "../entity/Campaign";
import { NotFoundException } from "../exceptions/NotFoundException";
import IPaginationFilter from "../services/interfaces/IPaginationFilter";
import {Source} from '../entity/Source';

@EntityRepository(Campaign)
export class CampaignRepository extends Repository<Campaign>{

    public listCampaigns = async (userId: number, filter: Partial<IPaginationFilter>): Promise<Campaign[]> => {
        const queryBuilder: SelectQueryBuilder<Campaign> = this.createQueryBuilder();
        const all: Campaign[] = await queryBuilder
            .select()
            //.leftJoinAndSelect(Source, "source_name")
            .take(filter.perPage)
            .skip((filter.page-1)*filter.perPage)
            .orderBy(filter.sort.field, filter.sort.direction)
            .where({ user_id: userId })
            //.printSql()
            .getMany();
        return all;
    }

    public async getCampaignById(id: number): Promise<Campaign> {
        return await this.findOne(id);
    }

    public async updateCampaign(id: number, data: Partial<Campaign>): Promise<Campaign> {
        const campaign = await this.findOne(id);
        const source = await this.getSourceFromName(String(data.source));

        if (!campaign) throw new NotFoundException('Campanha não encontrada');

        campaign.beginDate = data.beginDate;
        campaign.endDate = data.endDate;
        campaign.investment = data.investment;
        campaign.revenues = data.revenues;
        campaign.link = data.link;
        campaign.name = data.name;
        campaign.source_id = source.id;
        
        return await this.save(campaign);
    }

    public createCampaign = async (data: Partial<Campaign>): Promise<Campaign> => {
        const campaign = this.create();
        const source = await this.getSourceFromName(String(data.source));
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
    }

    public async deleteCampaign(id: number): Promise<any> {
        return await this.delete(id);
    }

    public async getInvestiment(userId: number): Promise<number> {
        const manager = getManager();
        const rawData = await manager.query(`
            SELECT sum(investment) as investiment 
              FROM campaign
            WHERE user_id = ?`, [userId]);
        const row = rawData[0]; 
        console.log(row.investiment);
        return Number(row.investiment);
    }

    public async getRevenue(userId: number): Promise<number> {
        const manager = getManager();
        const rawData = await manager.query(`
            SELECT sum(revenues) as revenues 
              FROM campaign
              WHERE user_id = ?`, [userId]);
        const row = rawData[0];          
        return Number(row.revenues);
    }

    public async getSourceFromName(name : string): Promise<Source> {
        const manager = getManager();
        const rawData = await manager.query(`
            SELECT * FROM source
              WHERE name = ?`, [name]);
        return rawData[0];          
    }
}
