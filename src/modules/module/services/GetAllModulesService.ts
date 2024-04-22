import { inject, injectable } from 'tsyringe';

import { Language, Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class GetAllModulesService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

  ) { }

  public async execute(language: Language): Promise<Module[] | null> {
    const module = await this.moduleRepository.findAllModules(language);

    return module;
  }
}
