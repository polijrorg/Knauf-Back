import { inject, injectable } from 'tsyringe';

import { Quizz } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import IQuizzRepository from '../repositories/IQuizzRepository';

@injectable()
export default class GetAllQuizzFromAModuleService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(moduleId: string): Promise<Quizz[] | null> {
    const questionExists = await this.moduleRepository.findByID(moduleId);

    if (!questionExists) throw new AppError('A module with this Id does not exist');

    const answers = await this.quizzRepository.getAll(moduleId);

    return answers;
  }
}
