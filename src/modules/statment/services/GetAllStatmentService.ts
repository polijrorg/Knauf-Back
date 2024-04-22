import { inject, injectable } from 'tsyringe';

import { Language, Statment } from '@prisma/client';

import IStatmentRepository from '../repositories/IStatmentRepository';

@injectable()
export default class GetAllStatmentService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,

  ) { }

  public async execute(language: Language): Promise<Statment[] | null> {
    const statment = await this.statmentRepository.getAll(language);

    return statment;
  }
}
