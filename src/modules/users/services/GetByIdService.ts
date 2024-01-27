import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class GetByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute({
    id,
  }: IRequest): Promise<Users> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new AppError('User not found');

    return user;
  }
}
