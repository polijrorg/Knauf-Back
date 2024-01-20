import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Questions } from '@prisma/client';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

interface IRequest {
  question: string;
}

@injectable()
export default class CreateQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute({
    question,
  }: IRequest): Promise<Questions> {
    const questions = await this.questionsRepository.create({
      question,
    });

    return questions;
  }
}
