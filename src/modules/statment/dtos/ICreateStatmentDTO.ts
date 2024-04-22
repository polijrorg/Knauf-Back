import { Language } from '@prisma/client';

interface ICreateStatmentDTO {
  image: string;
  text: string;
  title: string;
  language: Language;
}

export default ICreateStatmentDTO;
