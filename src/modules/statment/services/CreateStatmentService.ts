import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Statment } from '@prisma/client';

import IStatmentRepository from '../repositories/IStatmentRepository';

interface IRequest {
  image: string;
  text: string;
}

@injectable()
export default class CreateStatmentService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,
  ) { }

  public async execute({ image, text }: IRequest): Promise<Statment> {
    const statments = await this.statmentRepository.create({ image, text });

    return statments;
  }
}
