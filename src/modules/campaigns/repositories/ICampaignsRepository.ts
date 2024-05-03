import { Campaigns, Language, SeenCampaigns } from '@prisma/client';

import ICreateCampaignsDTO from '../dtos/ICreateCampaignsDTO';
import IUpdateCampaignsDTO from '../dtos/IUpdateCampaignsDTO';

interface ICampaignsRepository {
  findByID(id: string): Promise<Campaigns | null>;
  create(data: ICreateCampaignsDTO): Promise<Campaigns>;
  createSeenCampaigns(campaignsId: string, userId:string): Promise<SeenCampaigns>;
  delete(id: string): Promise<Campaigns>;
  getAll(language: Language): Promise<Campaigns[] | null>;
  getAllSeenCampaigns(campaignsId: string): Promise<SeenCampaigns[] | null>;
  update(id: string, data: IUpdateCampaignsDTO): Promise<Campaigns>;
}

export default ICampaignsRepository;
