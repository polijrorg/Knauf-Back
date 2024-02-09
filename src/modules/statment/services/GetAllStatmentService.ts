import { inject, injectable } from 'tsyringe';

import { Statment } from '@prisma/client';

import IStatmentRepository from '../repositories/IStatmentRepository';

@injectable()
export default class GetAllStatmentService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,

  ) { }

  public async execute(): Promise<Statment[] | null> {
    const statment = await this.statmentRepository.getAll();

    return statment;
  }
}
