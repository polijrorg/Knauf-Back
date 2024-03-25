import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISeenRepository from '../repositories/ISeenRepository';

@injectable()
export default class GetAllSeenFromAUserService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute(id: string): Promise<Seen[] | null> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const content = await this.seenRepository.getAllByUserId(id);

    return content;
  }
}
