import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class DeleteModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(id: string): Promise<Module> {
    const moduleExists = await this.moduleRepository.findByID(id);

    if (!moduleExists) throw new AppError('A module with this id does not exist');

    const module = await this.moduleRepository.delete(id);

    return module;
  }
}
