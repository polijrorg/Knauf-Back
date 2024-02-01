import { Content } from '@prisma/client';

import ICreateContentDTO from '../dtos/ICreateContentDTO';

interface IContentRepository {
  findByID(id: string): Promise<Content | null>;
  create(data: ICreateContentDTO): Promise<Content>;
  delete(id: string): Promise<Content>;
  findAll(): Promise<Content[] | null>;
}

export default IContentRepository;
