import { inject, injectable } from 'tsyringe';

import { QuizzQuestions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuizzQuestionsRepository from '../repositories/IQuizzQuestionsRepository';
import IQuizzRepository from '../repositories/IQuizzRepository';
import ICreateQuizzQuestionsDTO from '../dtos/ICreateQuizzQuestionsDTO';

@injectable()
export default class CreateQuizzQuestionsService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('QuizzQuestionsRepository')
    private quizzQuestionsRepository: IQuizzQuestionsRepository,
  ) { }

  public async execute(data: ICreateQuizzQuestionsDTO): Promise<QuizzQuestions> {
    const userExists = await this.quizzRepository.findByID(data.quizzId);

    if (!userExists) throw new AppError('A quizz with this Id does not exist');

    const answers = await this.quizzQuestionsRepository.create(data);

    return answers;
  }
}
