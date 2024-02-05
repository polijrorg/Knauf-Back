import prisma from '@shared/infra/prisma/client';
import { Prisma, Seen } from '@prisma/client';

import ISeenRepository from '@modules/content/repositories/ISeenRepository';
import ICreateContentDTO from '@modules/content/dtos/ICreateContentDTO';

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

  public async create(data: ICreateContentDTO): Promise<Content> {
    const content = await this.ormRepository.create({ data });

    return content;
  }

  public async delete(id: string): Promise<Content> {
    const content = await this.ormRepository.delete({ where: { id } });

    return content;
  }

  public async findAll(): Promise<Seen[] | null> {
    const content = await this.ormRepository.findMany();

    return content;
  }
}
