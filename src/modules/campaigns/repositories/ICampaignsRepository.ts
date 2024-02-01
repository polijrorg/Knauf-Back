import { Campaigns } from '@prisma/client';

import ICreateCampaignsDTO from '../dtos/ICreateCampaignsDTO';

interface ICampaignsRepository {
  findByID(id: string): Promise<Campaigns | null>;
  create(data: ICreateCampaignsDTO): Promise<Campaigns>;
  delete(id: string): Promise<Campaigns>;
  getAll(): Promise<Campaigns[] | null>;
}

export default ICampaignsRepository;
