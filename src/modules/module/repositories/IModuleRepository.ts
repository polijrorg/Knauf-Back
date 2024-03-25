import { Module } from '@prisma/client';

import ICreateModuleDTO from '../dtos/ICreateModuleDTO';
import IUpdateModuleDTO from '../dtos/IUpdateModuleDTO';

interface IModuleRepository {
  findByID(id: string): Promise<Module | null>;
  create(data: ICreateModuleDTO): Promise<Module>;
  delete(id: string): Promise<Module>;
  findAllModules(): Promise<Module[] | null>;
  update(id: string, data: IUpdateModuleDTO): Promise<Module>;
}

export default IModuleRepository;
