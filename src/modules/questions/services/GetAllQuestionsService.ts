import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
export default class GetAllQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(moduleId: string): Promise<Questions[] | null> {
    const moduleExists = await this.moduleRepository.findByID(moduleId);

    if (!moduleExists) throw new AppError('A module with this Id does not exist');

    const question = await this.questionsRepository.getAll(moduleId);

    return question;
  }
}
