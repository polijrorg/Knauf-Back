import { inject, injectable } from 'tsyringe';
import { Administrator } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest {
    id: string;
    newLanguage: string;
}

@injectable()
class UpdateLanguageService {
  constructor(
        @inject('AdministratorRepository')
        private administratorRepository: IAdministratorRepository,
  ) {}

  public async execute({ id, newLanguage }: IRequest): Promise<Administrator> {
    const administrator = await this.administratorRepository.updateLanguage(id, newLanguage);
    if (!administrator) throw new AppError('Administrator not found');
    return administrator;
  }
}

export default UpdateLanguageService;
