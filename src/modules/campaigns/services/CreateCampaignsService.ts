import { inject, injectable } from 'tsyringe';

import { Campaigns } from '@prisma/client';

import ICampaignsRepository from '../repositories/ICampaignsRepository';
import ICreateCampaignsDTO from '../dtos/ICreateCampaignsDTO';

@injectable()
export default class CreateCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute(data: ICreateCampaignsDTO): Promise<Campaigns> {
    const campaign = await this.CampaignsRepository.create(data);

    return campaign;
  }
}
