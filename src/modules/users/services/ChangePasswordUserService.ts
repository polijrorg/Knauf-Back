import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ChangePasswordUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(id: string, oldPassword: string, newPassword: string): Promise<Users> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) throw new AppError('A user with this id does not exist');

    const passwordMatch = await this.hashProvider.compareHash(oldPassword, userExists.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect old password');
    }

    if (newPassword) {
      const hashedPassword = await this.hashProvider.generateHash(newPassword);
      // eslint-disable-next-line no-param-reassign
      newPassword = hashedPassword;
    }
    const user = await this.usersRepository.changePassword(id, newPassword);

    return user;
  }
}
