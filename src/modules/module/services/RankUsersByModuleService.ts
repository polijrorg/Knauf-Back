import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class RankUsersByModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

  ) { }

  public async execute(moduleId: string): Promise<Users[] | null> {
    const module = await this.moduleRepository.rankUsersByModule(moduleId);

    return module;
  }
}
