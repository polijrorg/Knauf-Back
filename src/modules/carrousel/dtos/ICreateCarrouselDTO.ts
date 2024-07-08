import { Language } from '@prisma/client';

interface ICreateCarrouselDTO {
  campaingnId: string;
  title: string;
  subTitle: string;
  language: Language;
  image: string;
}

export default ICreateCarrouselDTO;
