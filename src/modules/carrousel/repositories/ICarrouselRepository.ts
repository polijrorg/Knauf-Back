import { Carrousel, Language } from '@prisma/client';

import ICreateCarrouselDTO from '../dtos/ICreateCarrouselDTO';
import IUpdateCarrouselDTO from '../dtos/IUpdateCarrousel';

interface ICarrouselRepository {
  create(data: ICreateCarrouselDTO): Promise<Carrousel>;
  update(id: string, data: IUpdateCarrouselDTO): Promise<Carrousel>;
  delete(id: string): Promise<Carrousel | null>;
  findAllCarrousels(): Promise<Carrousel[]>;
  findById(id: string): Promise<Carrousel | null>;
}

export default ICarrouselRepository;
