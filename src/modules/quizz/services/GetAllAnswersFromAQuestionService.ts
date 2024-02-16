import { inject, injectable } from 'tsyringe';

import { Answers } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IAnswersRepository from '../repositories/IAnswersRepository';

@injectable()
export default class GetAllAnswersFromAQuestionService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute(questionId: string): Promise<Answers[] | null> {
    const questionExists = await this.questionsRepository.findByID(questionId);

    if (!questionExists) throw new AppError('A question with this Id does not exist');

    const answers = await this.answersRepository.getAllFromAQuestion(questionId);

    return answers;
  }
}
