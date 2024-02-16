import prisma from '@shared/infra/prisma/client';
import { Prisma, Quizz } from '@prisma/client';

import IQuizzRepository from '@modules/quizz/repositories/IQuizzRepository';
import ICreateQuizzDTO from '@modules/quizz/dtos/ICreateQuizzDTO';

export default class QuizzRepository implements IQuizzRepository {
  private ormRepository: Prisma.QuizzDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.quizz;
  }

  public async findByID(id: string): Promise<Quizz | null> {
    const answer = await this.ormRepository.findUnique({
      where: { id },
    });

    return answer;
  }

  public async create(data: ICreateQuizzDTO): Promise<Quizz> {
    const answer = await this.ormRepository.create({ data });

    return answer;
  }

  public async delete(id: string): Promise<Quizz> {
    const answer = await this.ormRepository.delete({ where: { id } });

    return answer;
  }
}
