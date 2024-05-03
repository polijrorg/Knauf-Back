import { Answers } from '@prisma/client';

import ICreateAnswersDTO from '../dtos/ICreateAnswersDTO';

interface IAnswersRepository {
  findByID(id: string): Promise<Answers | null>;
  create(data: ICreateAnswersDTO): Promise<Answers>;
  delete(id: string): Promise<Answers>;
  getAllFromAUser(userId: string): Promise<Answers[] | null>;
  getAllFromAQuestion(questionId: string): Promise<Answers[] | null>;
  getAllToApprove(): Promise<Answers[] | null>;
  update(id: string, score: number): Promise<Answers>;
}

export default IAnswersRepository;
