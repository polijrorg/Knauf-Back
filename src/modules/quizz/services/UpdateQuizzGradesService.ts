import { inject, injectable } from 'tsyringe';

import { QuizzGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuizzGradesRepository from '../repositories/IQuizzGradesRepository';
import IUpdateQuizzGradesDTO from '../dtos/IUpdateQuizzGradesDTO';

@injectable()
export default class UpdateQuizzGradesService {
  constructor(
    @inject('QuizzGradesRepository')
    private quizzGradesRepository: IQuizzGradesRepository,
  ) { }

  public async execute(id: string, data: IUpdateQuizzGradesDTO): Promise<QuizzGrades> {
    const quizzGradesExists = await this.quizzGradesRepository.findByID(id);

    if (!quizzGradesExists) throw new AppError('A quizzGrade with this id does not exist');
    const answers = await this.quizzGradesRepository.update(id, data);

    return answers;
  }
}
