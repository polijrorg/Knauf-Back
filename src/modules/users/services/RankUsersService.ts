import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class RankUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute(): Promise<Users[] | null> {
    const user = await this.usersRepository.rankUsers();

    return user;
  }
}
