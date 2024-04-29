import prisma from '@shared/infra/prisma/client';
import { Prisma, Users } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import AppError from '@shared/errors/AppError';
import { String } from 'aws-sdk/clients/batch';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UsersDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.users;
  }

  public async findByEmail(email: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: [{ email }] },
    });

    return user;
  }

  public async findById(id: string): Promise<Users | null> {
    const user = await this.ormRepository.findUnique({ where: { id } });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<Users> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async delete(id: string): Promise<Users> {
    const user = await this.ormRepository.delete({ where: { id } });

    return user;
  }

  public async update(id: string, data: IUpdateUserDTO): Promise<Users> {
    const user = await this.ormRepository.update({ where: { id }, data });

    return user;
  }

  public async findAllUsers(): Promise<Users[] | null> {
    const user = await this.ormRepository.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        language: true,
        image: true,
        active: true,
        score: true,
        created_at: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return user as Users[];
  }

  public async rankUsers(): Promise<Users[] | null> {
    const usersNames = await this.ormRepository.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        language: true,
        image: true,
        active: true,
        score: true,
        created_at: true,
      },
      orderBy: {
        score: 'desc',
      },
    });

    return usersNames as Users[];
  }

  public async changePassword(id: string, newPassword: string): Promise<Users> {
    const user = await this.ormRepository.update({
      where:
       { id },
      data: { password: newPassword },
    });

    return user;
  }
}
