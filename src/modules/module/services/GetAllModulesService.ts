import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class GetAllModulesService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

  ) { }

  public async execute(): Promise<Module[] | null> {
    const module = await this.moduleRepository.findAllModules();

    return module;
  }
}
