import { inject, injectable } from 'tsyringe';

import { Answers } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAnswersRepository from '../repositories/IAnswersRepository';

@injectable()
export default class GetAllAnswersFromAUserService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(userId: string): Promise<Answers[] | null> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const answers = await this.answersRepository.getAllFromAUser(userId);

    return answers;
  }
}
