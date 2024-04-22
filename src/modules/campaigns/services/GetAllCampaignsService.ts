import { inject, injectable } from 'tsyringe';

import { Campaigns, Language } from '@prisma/client';

import ICampaignsRepository from '../repositories/ICampaignsRepository';

@injectable()
export default class GetAllCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute(language: Language): Promise<Campaigns[] | null> {
    const campaign = await this.CampaignsRepository.getAll(language);

    return campaign;
  }
}
