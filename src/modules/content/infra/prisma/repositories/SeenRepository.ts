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

  public async markAsSeen(id: string): Promise<Seen> {
    const content = await this.ormRepository.update({ where: { id }, data: { seen: true } });

    return content;
  }
}
