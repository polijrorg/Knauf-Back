import { Statment } from '@prisma/client';

import ICreateStatmentDTO from '../dtos/ICreateStatmentDTO';

interface IStatmentRepository {
  findByID(id: string): Promise<Statment | null>;
  create(data: ICreateStatmentDTO): Promise<Statment>;
  delete(id: string): Promise<Statment>;
  findAllStatment(): Promise<Statment[] | null>;
  updateImage(id: string, newImage: string): Promise<Statment>;
}

export default IStatmentRepository;
