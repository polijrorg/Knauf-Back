import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class UpdateImageService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

  ) { }

  public async execute(id: string, newImage: string): Promise<Module> {
    const module = await this.moduleRepository.updateImage(id, newImage);

    return module;
  }
}
