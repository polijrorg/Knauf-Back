import { Questions } from '@prisma/client';

import ICreateQuestionsDTO from '../dtos/ICreateQuestionsDTO';

interface IQuestionsRepository {
  findByID(id: string): Promise<Questions | null>;
  create(data: ICreateQuestionsDTO): Promise<Questions>;
  delete(id: string): Promise<Questions>;
  getAllFromAUser(userId: string, moduleId: string): Promise <Questions[] | null>;
  getAll(moduleId: string): Promise <Questions[] | null>;
  getAllToApprove(): Promise <Questions[] | null>;
  getAllToApproveByModule(moduleId: string): Promise <Questions[] | null>;
  update(id: string, score: number): Promise <Questions>;
}

export default IQuestionsRepository;
