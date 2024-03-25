import { Questions } from '@prisma/client';

import ICreateQuestionsDTO from '../dtos/ICreateQuestionsDTO';
import IUpdateQuestionsDTO from '../dtos/IUpdateQuestionDTO';

interface IQuestionsRepository {
  findByID(id: string): Promise<Questions | null>;
  create(data: ICreateQuestionsDTO): Promise<Questions>;
  delete(id: string): Promise<Questions>;
  getAllFromAUser(userId: string, moduleId: string): Promise <Questions[] | null>;
  getAll(moduleId: string): Promise <Questions[] | null>;
  getAllToApprove(): Promise <Questions[] | null>;
  getAllToApproveByModule(moduleId: string): Promise <Questions[] | null>;
  update(id: string, data: IUpdateQuestionsDTO): Promise <Questions>;
}

export default IQuestionsRepository;
