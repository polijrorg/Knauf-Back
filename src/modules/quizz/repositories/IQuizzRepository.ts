import { Quizz } from '@prisma/client';

import ICreateQuizzDTO from '../dtos/ICreateQuizzDTO';

interface IQuizzRepository {
  findByID(id: string): Promise<Quizz | null>;
  create(data: ICreateQuizzDTO): Promise<Quizz>;
  delete(id: string): Promise<Quizz>;
}

export default IQuizzRepository;
