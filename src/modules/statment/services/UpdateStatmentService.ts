import { inject, injectable } from 'tsyringe';

import { Statment } from '@prisma/client';

import IStatmentRepository from '../repositories/IStatmentRepository';
import IUpdateStatmentDTO from '../dtos/IUpdateStatmentDTO';

@injectable()
export default class UpdateStatmentService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,

  ) { }

  public async execute(id: string, data: IUpdateStatmentDTO): Promise<Statment> {
    const statment = await this.statmentRepository.update(id, data);

    return statment;
  }
}
