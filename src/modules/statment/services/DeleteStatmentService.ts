import { inject, injectable } from 'tsyringe';

import { Statment } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import IStatmentRepository from '../repositories/IStatmentRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteStatmentService {
  constructor(
    @inject('StatmentRepository')
    private statmentRepository: IStatmentRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Statment> {
    const statment = await this.statmentRepository.delete(id);

    return statment;
  }
}
