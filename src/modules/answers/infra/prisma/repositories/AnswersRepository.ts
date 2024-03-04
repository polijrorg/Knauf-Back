import prisma from '@shared/infra/prisma/client';
import { Prisma, Answers } from '@prisma/client';

import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import ICreateAnswersDTO from '@modules/answers/dtos/ICreateAnswersDTO';
import IUpdateAnswersDTO from '@modules/answers/dtos/IUpdateAnswersDTO';

export default class AnswersRepository implements IAnswersRepository {
  private ormRepository: Prisma.AnswersDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.answers;
  }

  public async findByID(id: string): Promise<Answers | null> {
    const answer = await this.ormRepository.findUnique({
      where: { id },
    });

    return answer;
  }

  public async create(data: ICreateAnswersDTO): Promise<Answers> {
    const answer = await this.ormRepository.create({ data });

    return answer;
  }

  public async delete(id: string): Promise<Answers> {
    const answer = await this.ormRepository.delete({ where: { id } });

    return answer;
  }

  public async getAllFromAUser(userId: string): Promise<Answers[] | null> {
    const answer = await this.ormRepository.findMany({ where: { userId }, orderBy: { created_at: 'desc' } });

    return answer;
  }

  public async getAllFromAQuestion(questionId: string): Promise<Answers[] | null> {
    const answer = await this.ormRepository.findMany({ where: { questionId }, orderBy: { created_at: 'desc' } });

    return answer;
  }

  public async update(id: string, data: IUpdateAnswersDTO): Promise<Answers> {
    const answer = await this.ormRepository.update({ where: { id }, data });

    return answer;
  }
}
