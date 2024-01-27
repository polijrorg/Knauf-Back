import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

// import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  newPassword: string;
}

@injectable()
export default class UpdatePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id, newPassword }: IRequest): Promise<Users> {
    const user = await this.usersRepository.updatePassword(id, newPassword);
    if (!user) throw new AppError('User not found');

    return user;
  }
}
