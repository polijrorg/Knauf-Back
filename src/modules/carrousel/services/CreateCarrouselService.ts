import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Carrousel } from '@prisma/client';

import ICarrouselRepository from '../repositories/ICarrouselRepository';
import ICreateCarrouselDTO from '../dtos/ICreateCarrouselDTO';

@injectable()
export default class CreateCarrouselService {
  constructor(
    @inject('CarrouselRepository')
    private carrouselRepository: ICarrouselRepository,
  ) { }

  public async execute(data: ICreateCarrouselDTO): Promise<Carrousel> {
    const carrousel = await this.carrouselRepository.create(data);
    return carrousel;
  }
}
