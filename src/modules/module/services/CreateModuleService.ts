import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';
import ICreateModuleDTO from '../dtos/ICreateModuleDTO';

@injectable()
export default class CreateModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(data: ICreateModuleDTO): Promise<Module> {
    const module = await this.moduleRepository.create(data);

    return module;
  }
}
