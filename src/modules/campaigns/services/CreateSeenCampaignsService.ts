import { inject, injectable } from 'tsyringe';

import { SeenCampaigns } from '@prisma/client';

import ICampaignsRepository from '../repositories/ICampaignsRepository';

@injectable()
export default class CreateSeenCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute(campaignsId: string, userId: string): Promise<SeenCampaigns> {
    const campaign = await this.CampaignsRepository.createSeenCampaigns(campaignsId, userId);

    return campaign;
  }
}
