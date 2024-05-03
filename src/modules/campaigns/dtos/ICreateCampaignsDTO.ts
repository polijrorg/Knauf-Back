import { Language } from '@prisma/client';

interface ICreateCampaignsDTO {
  image: string;
  title: string;
  subtitle: string;
  text: string;
  score: number;
  moduleId: string;
  language: Language;
}

export default ICreateCampaignsDTO;
