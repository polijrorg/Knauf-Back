import prisma from '@shared/infra/prisma/client';
import { Prisma, QuizzQuestions } from '@prisma/client';

import IQuizzQuestionsRepository from '@modules/quizz/repositories/IQuizzQuestionsRepository';
import ICreateQuizzQuestionsDTO from '@modules/quizz/dtos/ICreateQuizzQuestionsDTO';
import IUpdateQuizzQuestionsDTO from '@modules/quizz/dtos/IUpdateQuizzQuestionsDTO';

export default class QuizzQuestionsRepository implements IQuizzQuestionsRepository {
  private ormRepository: Prisma.QuizzQuestionsDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.quizzQuestions;
  }

  public async findByID(id: string): Promise<QuizzQuestions | null> {
    const answer = await this.ormRepository.findUnique({
      where: { id },
    });

    return answer;
  }

  public async create(data: ICreateQuizzQuestionsDTO): Promise<QuizzQuestions> {
    const answer = await this.ormRepository.create({ data });

    return answer;
  }

  public async delete(id: string): Promise<QuizzQuestions> {
    const answer = await this.ormRepository.delete({ where: { id } });

    return answer;
  }

  public async getAll(quizzId: string): Promise<QuizzQuestions[] | null> {
    const answer = await this.ormRepository.findMany({ where: { quizzId } });

    return answer;
  }

  public async update(id: string, data: IUpdateQuizzQuestionsDTO): Promise<QuizzQuestions> {
    const answer = await this.ormRepository.update({ where: { id }, data });

    return answer;
  }
}
