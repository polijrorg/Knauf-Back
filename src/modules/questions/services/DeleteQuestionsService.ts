import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute({
    id,
  }: IRequest): Promise<Questions> {
    const question = await this.questionsRepository.delete(id);

    return question;
  }
}
