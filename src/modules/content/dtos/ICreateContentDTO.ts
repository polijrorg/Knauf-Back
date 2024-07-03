import { Language } from '@prisma/client';

interface ICreateContentDTO {
  title: string;
  score: number;
  description: string;
  linkVideo: string;
  linkAudio: string;
  image: string;
  moduleId: string;
  language: Language;
}

export default ICreateContentDTO;
