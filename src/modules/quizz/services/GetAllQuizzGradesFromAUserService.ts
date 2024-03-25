import { inject, injectable } from 'tsyringe';

import { QuizzGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IQuizzGradesRepository from '../repositories/IQuizzGradesRepository';

@injectable()
export default class GetAllQuizzGradesFromAUSerService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('QuizzGradesRepository')
    private quizzGradesRepository: IQuizzGradesRepository,
  ) { }

  public async execute(userId: string): Promise<QuizzGrades[] | null> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const answers = await this.quizzGradesRepository.getAllFromAUser(userId);

    return answers;
  }
}
