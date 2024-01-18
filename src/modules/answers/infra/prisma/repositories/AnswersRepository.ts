import prisma from '@shared/infra/prisma/client';
import { Prisma, Answers } from '@prisma/client';

import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import ICreateAnswersDTO from '@modules/answers/dtos/ICreateAnswersDTO';

export default class AnswersRepository implements IAnswersRepository {
  private ormRepository: Prisma.AnswersDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.answers;
  }

  public async findByID(id: string): Promise<Answers | null> {
    const user = await this.ormRepository.findUnique({
      where: { id },
    });

    return user;
  }

  public async create(data: ICreateAnswersDTO): Promise<Answers> {
    const module = await this.ormRepository.create({ data });

    return module;
  }

  public async delete(id: string): Promise<Answers> {
    const user = await this.ormRepository.delete({ where: { id } });

    return user;
  }
}
