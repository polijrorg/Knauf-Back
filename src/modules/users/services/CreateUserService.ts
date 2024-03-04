import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(data: ICreateUserDTO): Promise<Users> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new AppError('User with same email already exists');

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    // eslint-disable-next-line no-param-reassign
    data.password = hashedPassword;

    const user = await this.usersRepository.create(data);

    return user;
  }
}
