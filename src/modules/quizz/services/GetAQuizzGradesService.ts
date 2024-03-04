import { inject, injectable } from 'tsyringe';

import { QuizzGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IQuizzRepository from '../repositories/IQuizzRepository';
import IQuizzGradesRepository from '../repositories/IQuizzGradesRepository';

@injectable()
export default class GetAQuizzGradesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('QuizzGradesRepository')
    private quizzGradesRepository: IQuizzGradesRepository,
  ) { }

  public async execute(quizzId: string, userId: string): Promise<QuizzGrades | null> {
    const questionExists = await this.quizzRepository.findByID(quizzId);

    if (!questionExists) throw new AppError('A quizz with this Id does not exist');

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const answers = await this.quizzGradesRepository.get(quizzId, userId);

    return answers;
  }
}
