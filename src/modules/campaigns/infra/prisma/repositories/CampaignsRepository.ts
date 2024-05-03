import prisma from '@shared/infra/prisma/client';
import {
  Prisma, Language, Campaigns, SeenCampaigns,
} from '@prisma/client';

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

  public async createSeenCampaigns(campaignsId: string, userId:string): Promise<SeenCampaigns> {
    const content = await prisma.seenCampaigns.create({ data: { campaignsId, userId, seen: true } });

    const user = await prisma.users.findUnique({ where: { id: userId } });

    const campaign = await prisma.campaigns.findUnique({ where: { id: campaignsId } });

    const moduleGrade = await prisma.moduleGrades.findFirst({ where: { userId, moduleId: campaign?.moduleId } });

    if (user && campaign) {
      const newScore = Math.floor(user.score + campaign.score);
      await prisma.users.update({ where: { id: userId }, data: { score: newScore } });

      if (moduleGrade) {
        const newGrade = Math.floor(moduleGrade.grade + campaign.score);
        await prisma.moduleGrades.update({ where: { id: moduleGrade.id }, data: { grade: newGrade } });
      }
    }

    return content;
  }

  public async delete(id: string): Promise<Campaigns> {
    const campaign = await this.ormRepository.delete({ where: { id } });

    return campaign;
  }

  public async getAll(language: Language): Promise<Campaigns[] | null> {
    const campaign = await this.ormRepository.findMany({ where: { language } });

    return campaign;
  }

  public async getAllSeenCampaigns(campaignsId: string): Promise<SeenCampaigns[] | null> {
    const campaign = await prisma.seenCampaigns.findMany({ where: { campaignsId } });

    return campaign;
  }

  public async update(id: string, data: IUpdateCampaignsDTO): Promise<Campaigns> {
    const campaign = await this.ormRepository.update({ where: { id }, data });

    return campaign;
  }
}
