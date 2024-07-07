import { inject, injectable } from 'tsyringe';

import { Carrousel } from '@prisma/client';

import AppError from '../../../shared/errors/AppError';

import ICarrouselRepository from '../repositories/ICarrouselRepository';

@injectable()
export default class DeleteCarrouselService {
  constructor(
    @inject('CarrouselRepository')
    private carrouselRepository: ICarrouselRepository,
  ) { }

  public async execute(id: string): Promise<Carrousel> {
    const carrouselExists = await this.carrouselRepository.findById(id);
    if (!carrouselExists) throw new AppError('User does not exist');
    const carrousel = await this.carrouselRepository.delete(id);
    return carrousel;
  }
}
