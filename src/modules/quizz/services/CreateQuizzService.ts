import { inject, injectable } from 'tsyringe';

import { Quizz } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import IQuizzRepository from '../repositories/IQuizzRepository';
import ICreateQuizzDTO from '../dtos/ICreateQuizzDTO';

@injectable()
export default class CreateQuizzService {
  constructor(
    @inject('QuizzRepository')
    private quizzRepository: IQuizzRepository,
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(data: ICreateQuizzDTO): Promise<Quizz> {
    const userExists = await this.moduleRepository.findByID(data.moduleId);

    if (!userExists) throw new AppError('A module with this Id does not exist');

    const answers = await this.quizzRepository.create(data);

    return answers;
  }
}
