import { inject, injectable } from 'tsyringe';

import { Carrousel } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICarrouselRepository from '../repositories/ICarrouselRepository';
import IUpdateCarrouselDTO from '../dtos/IUpdateCarrousel';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('CarrouselRepository')
    private carrouselRepository: ICarrouselRepository,
  ) { }

  public async execute(id: string, data: IUpdateCarrouselDTO): Promise<Carrousel> {
    const carrouselExists = await this.carrouselRepository.findById(id);

    if (!carrouselExists) throw new AppError('A carrousel with this id does not exist');
    const user = await this.carrouselRepository.update(id, data);

    return user;
  }
}
