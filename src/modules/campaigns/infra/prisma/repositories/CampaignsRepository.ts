import prisma from '@shared/infra/prisma/client';
import { Prisma, Campaigns } from '@prisma/client';

import ICampaignsRepository from '@modules/campaigns/repositories/ICampaignsRepository';
import ICreateCampaignsDTO from '@modules/campaigns/dtos/ICreateCampaignsDTO';
import IUpdateCampaignsDTO from '@modules/campaigns/dtos/IUpdateCampaignsDTO';

export default class CampaignsRepository implements ICampaignsRepository {
  private ormRepository: Prisma.CampaignsDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.campaigns;
  }

  public async findByID(id: string): Promise<Campaigns | null> {
    const campaign = await this.ormRepository.findUnique({
      where: { id },
    });

    return campaign;
  }

  public async create(data: ICreateCampaignsDTO): Promise<Campaigns> {
    const campaign = await this.ormRepository.create({ data });

    return campaign;
  }

  public async delete(id: string): Promise<Campaigns> {
    const campaign = await this.ormRepository.delete({ where: { id } });

    return campaign;
  }

  public async getAll(): Promise<Campaigns[] | null> {
    const campaign = await this.ormRepository.findMany();

    return campaign;
  }

  public async update(id: string, data: IUpdateCampaignsDTO): Promise<Campaigns> {
    const campaign = await this.ormRepository.update({ where: { id }, data });

    return campaign;
  }
}
