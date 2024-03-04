import prisma from '@shared/infra/prisma/client';
import { Prisma, Questions } from '@prisma/client';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import ICreateQuestionsDTO from '@modules/questions/dtos/ICreateQuestionsDTO';
import IUpdateQuestionsDTO from '@modules/questions/dtos/IUpdateQuestionDTO';

export default class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Prisma.QuestionsDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.questions;
  }

  public async findByID(id: string): Promise<Questions | null> {
    const question = await this.ormRepository.findUnique({
      where: { id },
    });

    return question;
  }

  public async create(data: ICreateQuestionsDTO): Promise<Questions> {
    const question = await this.ormRepository.create({ data });

    return question;
  }

  public async delete(id: string): Promise<Questions> {
    const question = await this.ormRepository.delete({ where: { id } });

    return question;
  }

  public async getAllFromAUser(userId: string, moduleId: string): Promise<Questions[] | null> {
    const question = await this.ormRepository.findMany({ where: { userId, moduleId }, orderBy: { created_at: 'desc' } });

    return question;
  }

  public async getAll(moduleId: string): Promise<Questions[] | null> {
    const question = await this.ormRepository.findMany({ where: { moduleId }, orderBy: { created_at: 'desc' } });

    return question;
  }

  public async update(id: string, data: IUpdateQuestionsDTO): Promise<Questions> {
    const question = await this.ormRepository.update({ where: { id }, data });

    return question;
  }
}
