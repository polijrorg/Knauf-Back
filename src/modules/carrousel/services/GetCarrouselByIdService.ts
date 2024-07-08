import { inject, injectable } from 'tsyringe';

import { Carrousel } from '@prisma/client';

import ICarrouselRepository from '../repositories/ICarrouselRepository';

@injectable()
export default class GetCarrouselByIdService {
  constructor(
    @inject('CarrouselRepository')
    private carrouselRepository: ICarrouselRepository,

  ) { }

  public async execute(id: string): Promise<Carrousel | null> {
    const carrousel = await this.carrouselRepository.findById(id);
    return carrousel;
  }
}
