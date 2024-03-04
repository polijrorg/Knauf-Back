import { inject, injectable } from 'tsyringe';

import { QuizzQuestions } from '@prisma/client';

import IQuizzQuestionsRepository from '../repositories/IQuizzQuestionsRepository';
import IUpdateQuizzQuestionsDTO from '../dtos/IUpdateQuizzQuestionsDTO';

@injectable()
export default class UpdateQuizzQuestionsService {
  constructor(
    @inject('QuizzQuestionsRepository')
    private quizzQuestionsRepository: IQuizzQuestionsRepository,
  ) { }

  public async execute(id: string, data: IUpdateQuizzQuestionsDTO): Promise<QuizzQuestions> {
    const answers = await this.quizzQuestionsRepository.update(id, data);

    return answers;
  }
}
