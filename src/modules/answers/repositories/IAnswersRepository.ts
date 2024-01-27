import { Answers } from '@prisma/client';

import ICreateAnswersDTO from '../dtos/ICreateAnswersDTO';

interface IAnswersRepository {
  findByID(id: string): Promise<Answers | null>;
  create(data: ICreateAnswersDTO): Promise<Answers>;
  delete(id: string): Promise<Answers>;
}

export default IAnswersRepository;
