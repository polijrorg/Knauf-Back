import { inject, injectable } from 'tsyringe';

import { Admin } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IAdminRepository from '../repositories/IAdminRepository';
import ICreateAdminDTO from '../dtos/ICreateAdminDTO';

@injectable()
export default class CreateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(data: ICreateAdminDTO): Promise<Admin> {
    const userAlreadyExists = await this.adminRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new AppError('Admin with same email already exists');

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    // eslint-disable-next-line no-param-reassign
    data.password = hashedPassword;

    const user = await this.adminRepository.create(data);

    return user;
  }
}
