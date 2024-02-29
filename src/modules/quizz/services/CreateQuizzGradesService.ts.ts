import { inject, injectable } from 'tsyringe';

import { QuizzGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IQuizzRepository from '../repositories/IQuizzRepository';
import IQuizzGradesRepository from '../repositories/IQuizzGradesRepository';
import ICreateQuizzGradesDTO from '../dtos/ICreateQuizzGradesDTO';

@injectable()
export default class CreateQuizzGradesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('QuizzGradesRepository')
    private quizzGradesRepository: IQuizzGradesRepository,
  ) { }

  public async execute(data: ICreateQuizzGradesDTO): Promise<QuizzGrades> {
    const quizzExists = await this.quizzRepository.findByID(data.quizzId);

    if (!quizzExists) throw new AppError('A quizz with this Id does not exist');

    const userExists = await this.usersRepository.findById(data.userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const answers = await this.quizzGradesRepository.create(data);

    return answers;
  }
}
