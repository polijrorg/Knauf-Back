import { inject, injectable } from 'tsyringe';

import { Answers } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IAnswersRepository from '../repositories/IAnswersRepository';
import IUpdateAnswersDTO from '../dtos/IUpdateAnswersDTO';

@injectable()
export default class UpdateAnswersService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) { }

  public async execute(id: string, data: IUpdateAnswersDTO): Promise<Answers> {
    const answerExists = await this.answersRepository.findByID(id);

    if (!answerExists) throw new AppError('An answer with this Id does not exist');

    const answer = await this.answersRepository.update(id, data);

    return answer;
  }
}
