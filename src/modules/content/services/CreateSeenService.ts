import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IContentRepository from '@modules/content/repositories/IContentRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ISeenRepository from '../repositories/ISeenRepository';
import ICreateSeenDTO from '../dtos/ICreateSeenDTO';

@injectable()
export default class CreateSeenService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ContentRepository')
    private contentRepository: IContentRepository,
  ) { }

  public async execute({ contentId, userId }: ICreateSeenDTO): Promise<Seen> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const contentExists = await this.contentRepository.findByID(contentId);

    if (!contentExists) throw new AppError('A content with this Id does not exist');

    const content = await this.seenRepository.create({
      contentId,
      userId,
    });

    return content;
  }
}
