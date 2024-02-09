import { Statment } from '@prisma/client';

import ICreateStatmentDTO from '../dtos/ICreateStatmentDTO';
import IUpdateStatmentDTO from '../dtos/IUpdateStatmentDTO';

interface IStatmentRepository {
  findByID(id: string): Promise<Statment | null>;
  create(data: ICreateStatmentDTO): Promise<Statment>;
  delete(id: string): Promise<Statment>;
  getAll(): Promise<Statment[] | null>;
  update(id: string, data: IUpdateStatmentDTO): Promise<Statment>;
  deleteAll(): Promise<Statment[] | null>;
}

export default IStatmentRepository;
