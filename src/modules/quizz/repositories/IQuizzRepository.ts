import { Quizz } from '@prisma/client';

import ICreateQuizzDTO from '../dtos/ICreateQuizzDTO';
import IUpdateQuizzDTO from '../dtos/IUpdateQuizzDTO';

interface IQuizzRepository {
  findByID(id: string): Promise<Quizz | null>;
  create(data: ICreateQuizzDTO): Promise<Quizz>;
  delete(id: string): Promise<Quizz>;
  getAll(moduleId: string): Promise<Quizz[] | null>;
  update(id:string, data: IUpdateQuizzDTO): Promise<Quizz>;
}

export default IQuizzRepository;
