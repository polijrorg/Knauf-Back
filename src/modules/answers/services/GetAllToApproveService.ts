import { inject, injectable } from 'tsyringe';

import { Answers } from '@prisma/client';

import IAnswersRepository from '../repositories/IAnswersRepository';

@injectable()
export default class GetAllToApproveService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) { }

  public async execute(): Promise<Answers[] | null> {
    const answers = await this.answersRepository.getAllToApprove();

    return answers;
  }
}
