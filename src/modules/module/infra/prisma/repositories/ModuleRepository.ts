import prisma from '@shared/infra/prisma/client';
import {
  Prisma, Module, Language, Users,
} from '@prisma/client';

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

    const allUsers = await prisma.users.findMany();

    const allModules = await prisma.module.findMany();

    const moduleGradesData: Prisma.ModuleGradesCreateManyInput[] = [];

    allUsers.forEach((user) => { allModules.forEach((modules) => { moduleGradesData.push({ userId: user.id, moduleId: modules.id }); }); });

    await prisma.moduleGrades.createMany({
      data: moduleGradesData,
    });

    return module;
  }

  public async delete(id: string): Promise<Module> {
    const module = await this.ormRepository.delete({ where: { id } });

    return module;
  }

  public async rankUsersByModule(moduleId: string): Promise<{ user: Users, grade: number }[] | null> {
    const moduleGrades = await prisma.moduleGrades.findMany({
      where: { moduleId },
      include: { user: true },
    });

    moduleGrades.sort((a, b) => b.grade - a.grade);

    const rankedUsers = moduleGrades.map((moduleGrade) => ({
      user: moduleGrade.user,
      grade: moduleGrade.grade,
    }));

    return rankedUsers;
  }

  public async findAllModules(language: Language): Promise<Module[] | null> {
    const module = await this.ormRepository.findMany({ where: { language } });

    return module;
  }

  public async update(id: string, data: IUpdateModuleDTO): Promise<Module> {
    const module = await this.ormRepository.update({ where: { id }, data });

    return module;
  }
}
