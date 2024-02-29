import { inject, injectable } from 'tsyringe';

import { Quizz } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuizzRepository from '../repositories/IQuizzRepository';

@injectable()
export default class DeleteQuizzService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
  ) { }

  public async execute(id: string): Promise<Quizz> {
    const userExists = await this.quizzRepository.findByID(id);

    if (!userExists) throw new AppError('A quizz with this Id does not exist');

    const answers = await this.quizzRepository.delete(id);

    return answers;
  }
}
