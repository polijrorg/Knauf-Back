import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import IModuleRepository from '../repositories/IModuleRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute({
    id,
  }: IRequest): Promise<Module> {
    const module = await this.moduleRepository.delete(id);

    return module;
  }
}
