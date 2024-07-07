import prisma from '@shared/infra/prisma/client';
import { Prisma, Carrousel, Language } from '@prisma/client';

import IUCarrouselRepository from '@modules/carrousel/repositories/ICarrouselRepository';
import ICreateCarrouselDTO from '@modules/carrousel/dtos/ICreateCarrouselDTO';
import IUpdateCarrouselDTO from '@modules/carrousel/dtos/IUpdateCarrousel';

export default class CarrouselsRepository implements IUCarrouselRepository {
  private ormRepository: Prisma.CarrouselDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.carrousel;
  }

  public async create(data: ICreateCarrouselDTO): Promise<Carrousel> {
    const campaingnExist = await prisma.campaigns.findFirst({
      where: { id: data.campaingnId },
    });

    if (!campaingnExist) {
      throw new Error('Campaingn not exist');
    }

    const carrousel = await this.ormRepository.create({ data });

    return carrousel;
  }

  public async update(id: string, data: IUpdateCarrouselDTO): Promise<Carrousel> {
    const carrouselExist = await this.findById(id);
    if (!carrouselExist) throw new Error('Carrousel not exist');
    const carrousel = await this.ormRepository.update({ where: { id }, data });
    return carrousel;
  }

  public async delete(id: string): Promise<Carrousel | null> {
    const carrouselExist = await this.findById(id);
    if (!carrouselExist) throw new Error('Carrousel not exist');
    const carrousel = await this.ormRepository.delete({ where: { id } });
    return carrousel;
  }

  public async findAllCarrousels(): Promise<Carrousel[]> {
    const carrousels = await this.ormRepository.findMany();
    return carrousels as Carrousel[];
  }

  public async findById(id: string): Promise<Carrousel | null> {
    const carrousel = await this.ormRepository.findUnique({ where: { id } });
    return carrousel;
  }
}
