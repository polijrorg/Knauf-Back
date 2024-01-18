import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

interface IRequest {
  name: string;
  image: string;
}

@injectable()
export default class CreateModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute({
    name, image,
  }: IRequest): Promise<Module> {
    const module = await this.moduleRepository.create({
      name,
      image,
    });

    return module;
  }
}
