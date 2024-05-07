import { inject, injectable } from 'tsyringe';

import { Users, Language } from '@prisma/client';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class RankUsersByLanguageService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute(language: Language): Promise<Users[] | null> {
    const user = await this.usersRepository.rankUsersByLanguage(language);

    return user;
  }
}
