import prisma from '@shared/infra/prisma/client';
import { Prisma, QuizzGrades } from '@prisma/client';

import IQuizzGradesRepository from '@modules/quizz/repositories/IQuizzGradesRepository';
import ICreateQuizzGradesDTO from '@modules/quizz/dtos/ICreateQuizzGradesDTO';

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
    const user = await prisma.users.findUnique({ where: { id: data.userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const quizz = await prisma.quizz.findUnique({ where: { id: data.quizzId } });

    if (!quizz) {
      throw new Error('Quizz not found');
    }

    const moduleGrade = await prisma.moduleGrades.findFirst({ where: { userId: user.id, moduleId: quizz.moduleId } });

    if (moduleGrade) {
      const newGrade = Math.floor(moduleGrade.grade + ((data.record / quizz.amountOfQuestions) * quizz.grade));
      await prisma.moduleGrades.update({ where: { id: moduleGrade.id }, data: { grade: newGrade } });
    }

    const newScore = Math.floor(user.score + ((data.record / quizz.amountOfQuestions) * quizz.grade));

    await prisma.users.update({ where: { id: data.userId }, data: { score: newScore } });

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
}
