import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Campaign} from "./Campaign";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    user_token?: string;

    @Column()
    email_validated?: boolean;

    @OneToMany(type => Campaign, campaign => campaign.user_id)
    campaigns: Campaign[];
}