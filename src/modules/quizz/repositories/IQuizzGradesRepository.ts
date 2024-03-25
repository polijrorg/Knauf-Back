import { QuizzGrades } from '@prisma/client';

import ICreateQuizzGradesDTO from '../dtos/ICreateQuizzGradesDTO';
import IUpdateQuizzGradesDTO from '../dtos/IUpdateQuizzGradesDTO';

interface IQuizzGradesRepository {
  findByID(id: string): Promise<QuizzGrades | null>;
  create(data: ICreateQuizzGradesDTO): Promise<QuizzGrades>;
  delete(id: string): Promise<QuizzGrades>;
  getSpecific(quizzId: string, userId: string): Promise<QuizzGrades | null>;
  getAllFromAUser(userId: string): Promise<QuizzGrades[] | null>;
  getAllFromAQuizz(quizzId: string): Promise<QuizzGrades[] | null>;
  update(id: string, data: IUpdateQuizzGradesDTO): Promise<QuizzGrades>;
}

export default IQuizzGradesRepository;
