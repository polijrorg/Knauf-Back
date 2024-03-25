import prisma from '@shared/infra/prisma/client';
import { Prisma, QuizzGrades } from '@prisma/client';

import IQuizzGradesRepository from '@modules/quizz/repositories/IQuizzGradesRepository';
import ICreateQuizzGradesDTO from '@modules/quizz/dtos/ICreateQuizzGradesDTO';
import IUpdateQuizzGradesDTO from '@modules/quizz/dtos/IUpdateQuizzGradesDTO';

export default class QuizzGradesRepository implements IQuizzGradesRepository {
  private ormRepository: Prisma.QuizzGradesDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.quizzGrades;
  }

  public async findByID(id: string): Promise<QuizzGrades | null> {
    const answer = await this.ormRepository.findUnique({
      where: { id },
    });

    return answer;
  }

  public async create(data: ICreateQuizzGradesDTO): Promise<QuizzGrades> {
    const answer = await this.ormRepository.create({ data });

    return answer;
  }

  public async delete(id: string): Promise<QuizzGrades> {
    const answer = await this.ormRepository.delete({ where: { id } });

    return answer;
  }

  public async getSpecific(quizzId: string, userId: string): Promise<QuizzGrades | null> {
    const answer = await this.ormRepository.findFirst({ where: { quizzId, userId } });

    return answer;
  }

  public async getAllFromAQuizz(quizzId: string): Promise<QuizzGrades[] | null> {
    const answer = await this.ormRepository.findMany({ where: { quizzId } });

    return answer;
  }

  public async getAllFromAUser(userId: string): Promise<QuizzGrades[] | null> {
    const answer = await this.ormRepository.findMany({ where: { userId } });

    return answer;
  }

  public async update(id: string, data: IUpdateQuizzGradesDTO): Promise<QuizzGrades> {
    const answer = await this.ormRepository.update({ where: { id }, data });

    return answer;
  }
}
