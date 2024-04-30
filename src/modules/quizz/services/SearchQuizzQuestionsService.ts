import { inject, injectable } from 'tsyringe';
import { QuizzQuestions } from '@prisma/client';
import IQuizzRepository from '../repositories/IQuizzRepository';
import IQuizzQuestionsRepository from '../repositories/IQuizzQuestionsRepository';

@injectable()
export default class SearchQuizzQuestionsService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('QuizzQuestionsRepository')
    private quizzQuestionsRepository: IQuizzQuestionsRepository,
  ) { }

  public async execute(keywords: string): Promise<QuizzQuestions[] | null> {
    const quizzQuestion = await this.quizzQuestionsRepository.search(keywords);

    return quizzQuestion;
  }
}
