import { Answers } from '@prisma/client';

import ICreateAnswersDTO from '../dtos/ICreateAnswersDTO';
import IUpdateAnswersDTO from '../dtos/IUpdateAnswersDTO';

interface IAnswersRepository {
  findByID(id: string): Promise<Answers | null>;
  create(data: ICreateAnswersDTO): Promise<Answers>;
  delete(id: string): Promise<Answers>;
  getAllFromAUser(userId: string): Promise<Answers[] | null>;
  getAllFromAQuestion(questionId: string): Promise<Answers[] | null>;
  update(id: string, data: IUpdateAnswersDTO): Promise<Answers>;
}

export default IAnswersRepository;
