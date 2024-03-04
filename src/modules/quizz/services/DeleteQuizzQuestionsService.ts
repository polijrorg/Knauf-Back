import { inject, injectable } from 'tsyringe';

import { QuizzQuestions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuizzQuestionsRepository from '../repositories/IQuizzQuestionsRepository';

@injectable()
export default class DeleteQuizzQuestionsService {
  constructor(
    @inject('QuizzQuestionsRepository')
    private quizzQuestionsRepository: IQuizzQuestionsRepository,
  ) { }

  public async execute(id: string): Promise<QuizzQuestions> {
    const userExists = await this.quizzQuestionsRepository.findByID(id);

    if (!userExists) throw new AppError('A quizzQuestion with this Id does not exist');

    const answers = await this.quizzQuestionsRepository.delete(id);

    return answers;
  }
}
