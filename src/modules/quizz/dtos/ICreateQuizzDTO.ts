import { Language } from '@prisma/client';

interface ICreateQuizzDTO {
  image: string;
  text: string;
  amountOfQuestions: number;
  moduleId: string;
  language: Language;
}

export default ICreateQuizzDTO;
