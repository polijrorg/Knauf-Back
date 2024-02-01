import { inject, injectable } from 'tsyringe';

import { Campaigns } from '@prisma/client';

import ICampaignsRepository from '../repositories/ICampaignsRepository';

@injectable()
export default class GetAllCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute(): Promise<Campaigns[] | null> {
    const campaign = await this.CampaignsRepository.getAll();

    return campaign;
  }
}
