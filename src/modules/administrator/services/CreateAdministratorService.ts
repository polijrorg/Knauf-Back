import { inject, injectable } from 'tsyringe';
import { Administrator } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
    language: string;
    image: string;
}

@injectable()
class CreateAdministratorService {
  constructor(
        @inject('AdministratorRepository')
        private administratorsRepository: IAdministratorRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
  ) {}

  public async execute({
    name, email, password, language, image,
  }: IRequest): Promise<Administrator> {
    const administratorAlreadyExists = await this.administratorsRepository.findByEmail(email);
    if (administratorAlreadyExists) throw new AppError('This e-mail address is already in use');

    const passwordHashed = await this.hashProvider.generateHash(password);

    const administrator = await this.administratorsRepository.create({
      name,
      email: email.toLocaleLowerCase(),
      password: passwordHashed,
      language,
      image,
    });
    return administrator;
  }
}

export default CreateAdministratorService;
