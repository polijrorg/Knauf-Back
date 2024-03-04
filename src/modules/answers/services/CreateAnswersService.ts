import { inject, injectable } from 'tsyringe';

import { Answers } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IAnswersRepository from '../repositories/IAnswersRepository';
import ICreateAnswersDTO from '../dtos/ICreateAnswersDTO';

@injectable()
export default class CreateAnswersService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(data: ICreateAnswersDTO): Promise<Answers> {
    const userExists = await this.usersRepository.findById(data.userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const questionExists = await this.questionsRepository.findByID(data.questionId);

    if (!questionExists) throw new AppError('A question with this Id does not exist');

    const answers = await this.answersRepository.create(data);

    return answers;
  }
}
