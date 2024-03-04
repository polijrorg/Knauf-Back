import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
export default class DeleteQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute(id: string): Promise<Questions> {
    const questionExists = await this.questionsRepository.findByID(id);

    if (!questionExists) throw new AppError('A question with this Id does not exist');

    const question = await this.questionsRepository.delete(id);

    return question;
  }
}
