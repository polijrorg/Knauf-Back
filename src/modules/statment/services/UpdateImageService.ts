import { inject, injectable } from 'tsyringe';

import { Statment } from '@prisma/client';

import IStatmentRepository from '../repositories/IStatmentRepository';

@injectable()
export default class UpdateImageService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,

  ) { }

  public async execute(id: string, newImage: string): Promise<Statment> {
    const statment = await this.statmentRepository.updateImage(id, newImage);

    return statment;
  }
}
