import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

import ICreateQuestionsDTO from '../dtos/ICreateQuestionsDTO';

@injectable()
export default class CreateQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(data: ICreateQuestionsDTO): Promise<Questions> {
    const userExists = await this.usersRepository.findById(data.userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const moduleExists = await this.moduleRepository.findByID(data.moduleId);

    if (!moduleExists) throw new AppError('A module with this Id does not exist');

    const questions = await this.questionsRepository.create(data);

    return questions;
  }
}
