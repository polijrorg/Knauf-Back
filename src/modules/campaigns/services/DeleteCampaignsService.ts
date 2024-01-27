import { inject, injectable } from 'tsyringe';

import { Campaigns } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import ICampaignsRepository from '../repositories/ICampaignsRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute({
    id,
  }: IRequest): Promise<Campaigns> {
    const campaign = await this.CampaignsRepository.delete(id);

    return campaign;
  }
}
