import { Questions } from '@prisma/client';

import ICreateQuestionsDTO from '../dtos/ICreateQuestionsDTO';

interface IQuestionsRepository {
  findByID(id: string): Promise<Questions | null>;
  create(data: ICreateQuestionsDTO): Promise<Questions>;
  delete(id: string): Promise<Questions>;
}

export default IQuestionsRepository;
