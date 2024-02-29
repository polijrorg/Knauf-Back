import { inject, injectable } from 'tsyringe';

import { Admin } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IAdminRepository from '../repositories/IAdminRepository';

@injectable()
export default class DeleteAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) { }

  public async execute(id: string): Promise<Admin> {
    const userExists = await this.adminRepository.findById(id);

    if (!userExists) throw new AppError('Admin does not exist');

    const user = await this.adminRepository.delete(id);

    return user;
  }
}
