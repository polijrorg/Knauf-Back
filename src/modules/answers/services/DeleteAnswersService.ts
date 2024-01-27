import { inject, injectable } from 'tsyringe';

import { Answers } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import IAnswersRepository from '../repositories/IAnswersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteAnswersService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) { }

  public async execute({
    id,
  }: IRequest): Promise<Answers> {
    const answer = await this.answersRepository.delete(id);

    return answer;
  }
}
