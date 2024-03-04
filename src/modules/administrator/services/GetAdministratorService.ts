import { inject, injectable } from 'tsyringe';
import { Administrator } from '@prisma/client';
import IAdministratorsRepository from '../repositories/IAdministratorRepository';

@injectable()
class GetAdministratorService {
  constructor(
        @inject('AdministratorRepository')
        private administratorRepository: IAdministratorsRepository,
  ) {}

  public async execute(): Promise<Administrator> {
    const administrator = await this.administratorRepository.findAdmin();
    return administrator;
  }
}

export default GetAdministratorService;
