import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

@injectable()
class ResetPasswordForAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(): Promise<Users[]> {
    const users = await this.usersRepository.findAllUsers();
    if (!users || users.length === 0) {
      throw new AppError('Não há usuários cadastrados');
    }

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await this.hashProvider.generateHash('Kn4uF@App');
        const updatedUser = await this.usersRepository.changePassword(user.id, hashedPassword);
        return updatedUser;
      }),
    );

    return updatedUsers;
  }
}

export default ResetPasswordForAllUsersService;
