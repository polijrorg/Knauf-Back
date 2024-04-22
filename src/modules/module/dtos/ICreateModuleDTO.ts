import { Language } from '@prisma/client';

interface ICreateModuleDTO {
  name: string;
  image: string;
  language: Language;
}

export default ICreateModuleDTO;
