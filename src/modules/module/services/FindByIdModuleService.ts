import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class FindByIdModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

  ) { }

  public async execute(id: string): Promise<Module | null> {
    const module = await this.moduleRepository.findByID(id);

    return module;
  }
}
