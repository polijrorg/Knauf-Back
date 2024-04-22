import { Language } from '@prisma/client';

interface ICreateContentDTO {
  title: string;
  description: string;
  linkVideo: string;
  linkAudio: string;
  image: string;
  moduleId: string;
  language: Language;
}

export default ICreateContentDTO;
