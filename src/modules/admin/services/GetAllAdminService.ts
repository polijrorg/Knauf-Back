import { inject, injectable } from 'tsyringe';

import { Admin } from '@prisma/client';

import IAdminRepository from '../repositories/IAdminRepository';

@injectable()
export default class GetAllAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

  ) { }

  public async execute(): Promise<Admin[] | null> {
    const user = await this.adminRepository.getAll();

    return user;
  }
}
