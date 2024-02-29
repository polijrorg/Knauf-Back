import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { Admin } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IAdminRepository from '../repositories/IAdminRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class AuthenticateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<{ user: Admin, token: string }> {
    const user = await this.adminRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
