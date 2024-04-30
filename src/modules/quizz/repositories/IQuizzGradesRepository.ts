import { QuizzGrades } from '@prisma/client';

import ICreateQuizzGradesDTO from '../dtos/ICreateQuizzGradesDTO';

interface IQuizzGradesRepository {
  findByID(id: string): Promise<QuizzGrades | null>;
  create(data: ICreateQuizzGradesDTO): Promise<QuizzGrades>;
  delete(id: string): Promise<QuizzGrades>;
  getSpecific(quizzId: string, userId: string): Promise<QuizzGrades | null>;
  getAllFromAUser(userId: string): Promise<QuizzGrades[] | null>;
  getAllFromAQuizz(quizzId: string): Promise<QuizzGrades[] | null>;
}

export default IQuizzGradesRepository;
