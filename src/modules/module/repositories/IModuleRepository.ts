import { Language, Module, Users } from '@prisma/client';

import ICreateModuleDTO from '../dtos/ICreateModuleDTO';
import IUpdateModuleDTO from '../dtos/IUpdateModuleDTO';

interface IModuleRepository {
  findByID(id: string): Promise<Module | null>;
  create(data: ICreateModuleDTO): Promise<Module>;
  delete(id: string): Promise<Module>;
  findAllModules(language: Language): Promise<Module[] | null>;
  update(id: string, data: IUpdateModuleDTO): Promise<Module>;
  rankUsersByModule(moduleId: string): Promise<Users[] | null>;
}

export default IModuleRepository;
