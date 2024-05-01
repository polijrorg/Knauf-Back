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
    const treated_keyword = `${keywords.replace(/ +/gm, ' ').replace(/ $|^ /gm, '').replace(/ /gm, ':* | ')}:*`;
    const quizzQuestion = await this.quizzQuestionsRepository.search(treated_keyword);

    return quizzQuestion;
  }
}
