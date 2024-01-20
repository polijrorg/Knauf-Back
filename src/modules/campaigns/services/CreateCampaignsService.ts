import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Campaigns } from '@prisma/client';

import ICampaignsRepository from '../repositories/ICampaignsRepository';

interface IRequest {
  image: string;
  title: string;
  subtitle: string;
  text: string;
}

@injectable()
export default class CreateCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private CampaignsRepository: ICampaignsRepository,
  ) { }

  public async execute({
    image, title, subtitle, text,
  }: IRequest): Promise<Campaigns> {
    const campaign = await this.CampaignsRepository.create({
      image,
      title,
      subtitle,
      text,
    });

    return campaign;
  }
}
