import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  newLanguage: string;
}

@injectable()
export default class UpdatePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id, newLanguage }: IRequest): Promise<Users> {
    const user = await this.usersRepository.updateLanguage(id, newLanguage);
    if (!user) throw new AppError('User not found');

    return user;
  }
}
