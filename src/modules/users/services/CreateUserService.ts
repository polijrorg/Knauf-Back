import { inject, injectable } from 'tsyringe';
// import path from 'path';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  language: string;
  image: string;
  active: boolean;
  score: number;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({
    cpf, email, name, password, phone, language, image, active, score,
  }: IRequest): Promise<Users> {
    const userAlreadyExists = await this.usersRepository.findByEmailPhoneOrCpf(email, phone, cpf);

    if (userAlreadyExists) throw new AppError('User with same name, phone or cpf already exists');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email: email.toLowerCase(),
      cpf,
      password: hashedPassword,
      phone,
      language,
      image,
      active,
      score,
    });

    // const templateDataFile = path.resolve(__dirname, '..', 'views', 'create_account.hbs');

    // await this.mailProvider.sendMail({
    //   to: {
    //     name,
    //     email,
    //   },
    //   subject: 'Criação de conta',
    //   templateData: {
    //     file: templateDataFile,
    //     variables: { name },
    //   },
    // }); -- Mandar email - Talvez no futuro

    return user;
  }
}
