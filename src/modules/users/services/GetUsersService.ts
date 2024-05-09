import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute(id: string): Promise<Users | null> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}
