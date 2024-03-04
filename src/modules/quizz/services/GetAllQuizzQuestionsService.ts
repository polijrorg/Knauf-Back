import { inject, injectable } from 'tsyringe';

import { QuizzQuestions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuizzRepository from '../repositories/IQuizzRepository';
import IQuizzQuestionsRepository from '../repositories/IQuizzQuestionsRepository';

@injectable()
export default class GetAllQuizzQuestionsService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('QuizzGradesRepository')
    private quizzQuestionsRepository: IQuizzQuestionsRepository,
  ) { }

  public async execute(quizzId: string): Promise<QuizzQuestions[] | null> {
    const questionExists = await this.quizzRepository.findByID(quizzId);

    if (!questionExists) throw new AppError('A quizz with this Id does not exist');

    const answers = await this.quizzQuestionsRepository.get(quizzId);

    return answers;
  }
}
