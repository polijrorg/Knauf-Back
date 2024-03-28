import prisma from '@shared/infra/prisma/client';
import { Prisma, Module } from '@prisma/client';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ICreateModuleDTO from '@modules/module/dtos/ICreateModuleDTO';
import IUpdateModuleDTO from '@modules/module/dtos/IUpdateModuleDTO';

export default class ModuleRepository implements IModuleRepository {
  private ormRepository: Prisma.ModuleDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.module;
  }

  public async findByID(id: string): Promise<Module | null> {
    const module = await this.ormRepository.findUnique({
      where: { id },
    });

    return module;
  }

  public async create(data: ICreateModuleDTO): Promise<Module> {
    const module = await this.ormRepository.create({ data });

    return module;
  }

  public async delete(id: string): Promise<Module> {
    const module = await this.ormRepository.delete({ where: { id } });

    return module;
  }

  public async findAllModules(): Promise<Module[] | null> {
    const module = await this.ormRepository.findMany();

    return module;
  }

  public async update(id: string, data: IUpdateModuleDTO): Promise<Module> {
    const module = await this.ormRepository.update({ where: { id }, data });

    return module;
  }
}
