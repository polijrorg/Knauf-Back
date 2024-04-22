import { Language, Content } from '@prisma/client';

import ICreateContentDTO from '../dtos/ICreateContentDTO';
import IUpdateContentDTO from '../dtos/IUpdateContentDTO';

interface IContentRepository {
  findByID(id: string): Promise<Content | null>;
  create(data: ICreateContentDTO): Promise<Content>;
  delete(id: string): Promise<Content>;
  findAll(language: Language): Promise<Content[] | null>;
  update(id: string, data: IUpdateContentDTO): Promise<Content>;
}

export default IContentRepository;
