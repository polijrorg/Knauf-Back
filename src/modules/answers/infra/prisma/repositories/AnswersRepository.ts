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

  public async getAllToApprove(): Promise<Answers[] | null> {
    const answer = await this.ormRepository.findMany({ where: { approved: false }, orderBy: { created_at: 'desc' } });

    return answer;
  }

  public async update(id: string, score: number): Promise<Answers> {
    const answer = await this.ormRepository.update({ where: { id }, data: { score, approved: true } });
    const usersId = answer.userId;

    const user = await prisma.users.findUnique({ where: { id: usersId } });

    const question = await prisma.questions.findUnique({ where: { id: answer.questionId } });

    const moduleGrade = await prisma.moduleGrades.findFirst({ where: { userId: usersId, moduleId: question?.moduleId } });

    const exists = await this.ormRepository.findMany({ where: { userId: usersId, questionId: answer.questionId } });

    if (user && exists.length === 1) {
      const newScore = Math.floor(user.score + score);
      await prisma.users.update({ where: { id: usersId }, data: { score: newScore } });

      if (moduleGrade) {
        const newGrade = Math.floor(moduleGrade.grade + score);
        await prisma.moduleGrades.update({ where: { id: moduleGrade.id }, data: { grade: newGrade } });
      }
    }

    return answer;
  }
}
