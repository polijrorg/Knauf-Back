import { inject, injectable } from 'tsyringe';

import { QuizzGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuizzRepository from '../repositories/IQuizzRepository';
import IQuizzGradesRepository from '../repositories/IQuizzGradesRepository';

@injectable()
export default class GetAllQuizzGradesFromAQuizzService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('QuizzGradesRepository')
    private quizzGradesRepository: IQuizzGradesRepository,
  ) { }

  public async execute(quizzId: string): Promise<QuizzGrades[] | null> {
    const userExists = await this.quizzRepository.findByID(quizzId);

    if (!userExists) throw new AppError('A quizz with this Id does not exist');

    const answers = await this.quizzGradesRepository.getAllFromAQuizz(quizzId);

    return answers;
  }
}
