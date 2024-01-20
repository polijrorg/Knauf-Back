import { inject, injectable } from 'tsyringe';

import { Content } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import IContentRepository from '../repositories/IContentRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteContentService {
  constructor(
    @inject('UsersRepository')
    private contentRepository: IContentRepository,
  ) { }

  public async execute({
    id,
  }: IRequest): Promise<Content> {
    const content = await this.contentRepository.delete(id);

    return content;
  }
}
