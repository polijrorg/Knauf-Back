import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Statment } from '@prisma/client';

import IStatmentRepository from '../repositories/IStatmentRepository';
import ICreateStatmentDTO from '../dtos/ICreateStatmentDTO';

@injectable()
export default class CreateStatmentService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,
  ) { }

  public async execute(data: ICreateStatmentDTO): Promise<Statment> {
    const statments = await this.statmentRepository.create(data);

    return statments;
  }
}
