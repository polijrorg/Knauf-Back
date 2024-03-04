import { inject, injectable } from 'tsyringe';

import { Quizz } from '@prisma/client';

import IQuizzRepository from '../repositories/IQuizzRepository';
import IUpdateQuizzDTO from '../dtos/IUpdateQuizzDTO';

@injectable()
export default class UpdateQuizzService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
  ) { }

  public async execute(id: string, data: IUpdateQuizzDTO): Promise<Quizz> {
    const answers = await this.quizzRepository.update(id, data);

    return answers;
  }
}
