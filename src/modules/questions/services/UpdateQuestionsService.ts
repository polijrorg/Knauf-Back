import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
export default class UpdateQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute(id: string, score: number): Promise<Questions> {
    const questionExists = await this.questionsRepository.findByID(id);

    if (!questionExists) throw new AppError('A question with this Id does not exist');
    const question = await this.questionsRepository.update(id, score);

    return question;
  }
}
