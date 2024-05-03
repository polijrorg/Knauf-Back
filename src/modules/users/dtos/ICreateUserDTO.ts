import { Language } from '@prisma/client';

interface ICreateUserDTO {
  email: string;
  password: string;
  language: Language;
  name: string;
  image: string;
  active: boolean;
  score: number;
}

export default ICreateUserDTO;
