import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { Administrator } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class AuthenticateAdministratorService {
  constructor(
    @inject('AdministratorRepository')
    private administratorRepository: IAdministratorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<{ administrator: Administrator, token: string }> {
    const administrator = await this.administratorRepository.findByEmail(email);

    if (!administrator) {
      throw new AppError('Incorrect email', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, administrator.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: administrator.id,
      expiresIn,
    });

    return {
      administrator,
      token,
    };
  }
}
