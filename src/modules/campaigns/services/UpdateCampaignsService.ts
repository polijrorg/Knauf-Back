import { inject, injectable } from 'tsyringe';

import { Campaigns } from '@prisma/client';

import ICampaignsRepository from '../repositories/ICampaignsRepository';
import IUpdateCampaignsDTO from '../dtos/IUpdateCampaignsDTO';

@injectable()
export default class UpdateCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute(id: string, data: IUpdateCampaignsDTO): Promise<Campaigns> {
    const campaign = await this.CampaignsRepository.update(id, data);

    return campaign;
  }
}
