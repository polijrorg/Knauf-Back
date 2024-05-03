import { inject, injectable } from 'tsyringe';

import { SeenCampaigns } from '@prisma/client';

import ICampaignsRepository from '../repositories/ICampaignsRepository';

@injectable()
export default class GetAllSeenCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute(campaignsId: string): Promise<SeenCampaigns[] | null> {
    const campaign = await this.CampaignsRepository.getAllSeenCampaigns(campaignsId);

    return campaign;
  }
}
