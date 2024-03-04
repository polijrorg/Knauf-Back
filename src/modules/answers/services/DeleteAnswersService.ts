import { inject, injectable } from 'tsyringe';

import { Answers } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IAnswersRepository from '../repositories/IAnswersRepository';

@injectable()
export default class DeleteAnswersService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) { }

  public async execute(id: string): Promise<Answers> {
    const answerExists = await this.answersRepository.findByID(id);

    if (!answerExists) throw new AppError('An answer with this Id does not exist');

    const answer = await this.answersRepository.delete(id);

    return answer;
  }
}
