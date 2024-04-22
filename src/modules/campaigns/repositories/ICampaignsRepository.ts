import { Campaigns, Language } from '@prisma/client';

import ICreateCampaignsDTO from '../dtos/ICreateCampaignsDTO';
import IUpdateCampaignsDTO from '../dtos/IUpdateCampaignsDTO';

interface ICampaignsRepository {
  findByID(id: string): Promise<Campaigns | null>;
  create(data: ICreateCampaignsDTO): Promise<Campaigns>;
  delete(id: string): Promise<Campaigns>;
  getAll(language: Language): Promise<Campaigns[] | null>;
  update(id: string, data: IUpdateCampaignsDTO): Promise<Campaigns>;
}

export default ICampaignsRepository;
