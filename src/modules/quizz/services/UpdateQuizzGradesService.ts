import { inject, injectable } from 'tsyringe';

import { QuizzGrades } from '@prisma/client';

import IQuizzGradesRepository from '../repositories/IQuizzGradesRepository';
import IUpdateQuizzGradesDTO from '../dtos/IUpdateQuizzGradesDTO';

@injectable()
export default class UpdateQuizzGradesService {
  constructor(
    @inject('QuizzGradesRepository')
    private quizzGradesRepository: IQuizzGradesRepository,
  ) { }

  public async execute(id: string, data: IUpdateQuizzGradesDTO): Promise<QuizzGrades> {
    const answers = await this.quizzGradesRepository.update(id, data);

    return answers;
  }
}
