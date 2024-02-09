import { inject, injectable } from 'tsyringe';

import { Statment } from '@prisma/client';

import IStatmentRepository from '../repositories/IStatmentRepository';

@injectable()
export default class DeleteAllStatmentsService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,
  ) { }

  public async execute(): Promise<Statment[] | null> {
    const statment = await this.statmentRepository.deleteAll();

    return statment;
  }
}
