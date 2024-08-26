import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ResetPasswordUserByIdService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
  ) { }

  public async execute(id: string): Promise<Users> {
    const user = await this.usersRepository.findById(id);
    if (!user?.password) throw new AppError('Usuário sem senha');
    user.password = 'senha123456789';
    const hashedPassword = await this.hashProvider.generateHash(user.password);
    const userWithPassword = await this.usersRepository.changePassword(id, hashedPassword);
    return userWithPassword;
  }
}

export default ResetPasswordUserByIdService;
