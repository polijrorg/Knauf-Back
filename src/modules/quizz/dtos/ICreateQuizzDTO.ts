import { Language } from '@prisma/client';

interface ICreateQuizzDTO {
  image: string;
  text: string;
  amountOfQuestions: number;
  timeLimit: number;
  grade: number;
  moduleId: string;
  language: Language;
}

export default ICreateQuizzDTO;
