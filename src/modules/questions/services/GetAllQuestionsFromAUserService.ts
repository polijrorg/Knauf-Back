import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
export default class GetAllQuestionsFromAUserService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(userId: string, moduleId: string): Promise<Questions[] | null> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new AppError('A user with this Id does not exist');

    const moduleExists = await this.moduleRepository.findByID(moduleId);

    if (!moduleExists) throw new AppError('A module with this Id does not exist');

    const question = await this.questionsRepository.getAllFromAUser(userId, moduleId);

    return question;
  }
}
