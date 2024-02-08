import { inject, injectable } from 'tsyringe';

import { Content } from '@prisma/client';

import IContentRepository from '../repositories/IContentRepository';

interface IRequest {
  title: string;
  description: string;
  linkVideo: string;
  linkAudio: string;
  image: string;
}

@injectable()
export default class CreateContentService {
  constructor(
    @inject('ContentRepository')
    private contentRepository: IContentRepository,
  ) { }

  public async execute({
    title, description, linkVideo, linkAudio, image,
  }: IRequest): Promise<Content> {
    const content = await this.contentRepository.create({
      title,
      description,
      linkVideo,
      linkAudio,
      image,
    });

    return content;
  }
}
