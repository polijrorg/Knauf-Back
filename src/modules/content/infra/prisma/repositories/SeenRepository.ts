import prisma from '@shared/infra/prisma/client';
import { Prisma, Seen } from '@prisma/client';

import ISeenRepository from '@modules/content/repositories/ISeenRepository';
import ICreateSeenDTO from '@modules/content/dtos/ICreateSeenDTO';

export default class SeenRepository implements ISeenRepository {
  private ormRepository: Prisma.SeenDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.seen;
  }

  public async findByID(id: string): Promise<Seen | null> {
    const content = await this.ormRepository.findUnique({
      where: { id },
    });

    return content;
  }

  public async create(data: ICreateSeenDTO): Promise<Seen> {
    const content = await this.ormRepository.create({ data });

    return content;
  }

  public async getAllByUserId(userId: string): Promise<Seen[] | null> {
    const content = await this.ormRepository.findMany({ where: { userId } });

    return content;
  }

  public async getAllByContentId(contentId: string): Promise<Seen[] | null> {
    const content = await this.ormRepository.findMany({ where: { contentId } });

    return content;
  }

  public async getByUserAndContent(userId: string, contentId: string): Promise<Seen | null> {
    const content = await this.ormRepository.findFirst({ where: { contentId, userId } });

    return content;
  }

  public async markAsSeen(userId: string, contentId: string): Promise<Seen> {
    const seen = await this.ormRepository.update({ where: { userId, contentId }, data: { seen: true } });

    const content = await prisma.content.findUnique({ where: { id: contentId } });

    const moduleGrade = await prisma.moduleGrades.findFirst({ where: { userId, moduleId: content?.moduleId } });

    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (user && content) {
      const newScore = user.score + content.score;
      await prisma.users.update({ where: { id: userId }, data: { score: newScore } });

      if (moduleGrade) {
        const newGrade = Math.floor(moduleGrade.grade + content.score);
        await prisma.moduleGrades.update({ where: { id: moduleGrade.id }, data: { grade: newGrade } });
      }
    }

    return seen;
  }
}
