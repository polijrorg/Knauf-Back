import { Module } from '@prisma/client';

import ICreateModuleDTO from '../dtos/ICreateModuleDTO';

interface IModuleRepository {
  findByID(id: string): Promise<Module | null>;
  create(data: ICreateModuleDTO): Promise<Module>;
  delete(id: string): Promise<Module>;
  findAllModules(): Promise<Module[] | null>;
  updateImage(id: string, newImage: string): Promise<Module>;
}

export default IModuleRepository;
