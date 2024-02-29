import { inject, injectable } from 'tsyringe';

import { QuizzGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuizzGradesRepository from '../repositories/IQuizzGradesRepository';

@injectable()
export default class DeleteQuizzGradesService {
  constructor(
    @inject('QuizzGradesRepository')
    private quizzGradesRepository: IQuizzGradesRepository,
  ) { }

  public async execute(id: string): Promise<QuizzGrades> {
    const userExists = await this.quizzGradesRepository.findByID(id);

    if (!userExists) throw new AppError('A quizzGrade with this Id does not exist');

    const answers = await this.quizzGradesRepository.delete(id);

    return answers;
  }
}
