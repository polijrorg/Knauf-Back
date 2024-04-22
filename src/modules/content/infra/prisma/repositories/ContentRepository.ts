import prisma from '@shared/infra/prisma/client';
import { Prisma, Language, Content } from '@prisma/client';

import IContentRepository from '@modules/content/repositories/IContentRepository';
import ICreateContentDTO from '@modules/content/dtos/ICreateContentDTO';
import IUpdateContentDTO from '@modules/content/dtos/IUpdateContentDTO';

export default class ContentRepository implements IContentRepository {
  private ormRepository: Prisma.ContentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.content;
  }

  public async findByID(id: string): Promise<Content | null> {
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

  public async findAll(language: Language): Promise<Content[] | null> {
    const content = await this.ormRepository.findMany({ where: { language } });

    return content;
  }

  public async update(id:string, data: IUpdateContentDTO): Promise<Content> {
    const content = await this.ormRepository.update({ where: { id }, data });

    return content;
  }
}
