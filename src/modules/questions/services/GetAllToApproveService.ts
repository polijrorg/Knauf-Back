import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
export default class GetAllToApproveService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute(): Promise<Questions[] | null> {
    const question = await this.questionsRepository.getAllToApprove();

    return question;
  }
}
