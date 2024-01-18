import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Answers } from '@prisma/client';

import IAnswersRepository from '../repositories/IAnswersRepository';

interface IRequest {
  answer: string;
}

@injectable()
export default class CreateAnswersService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) { }

  public async execute({
    answer,
  }: IRequest): Promise<Answers> {
    const answers = await this.answersRepository.create({
      answer,
    });

    return answers;
  }
}
