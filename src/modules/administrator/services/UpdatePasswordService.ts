import { inject, injectable } from 'tsyringe';
import { Administrator } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest {
    id: string;
    newPassword: string;
}

@injectable()
class UpdatePasswordService {
  constructor(
        @inject('AdministratorRepository')
        private administratorRepository: IAdministratorRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, newPassword }: IRequest): Promise<Administrator> {
    const hashedPassword = await this.hashProvider.generateHash(newPassword);

    const administrator = await this.administratorRepository.updatePassword(id, hashedPassword);
    if (!administrator) throw new AppError('Administrator not found');
    return administrator;
  }
}

export default UpdatePasswordService;
