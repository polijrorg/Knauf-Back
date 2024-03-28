import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '../repositories/IModuleRepository';
import IUpdateModuleDTO from '../dtos/IUpdateModuleDTO';

@injectable()
export default class UpdateModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

  ) { }

  public async execute(id: string, data: IUpdateModuleDTO): Promise<Module> {
    const moduleExists = await this.moduleRepository.findByID(id);

    if (!moduleExists) throw new AppError('A module with this id does not exist');

    const module = await this.moduleRepository.update(id, data);

    return module;
  }
}
