import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import ISeenRepository from '../repositories/ISeenRepository';

@injectable()
export default class GetAllSeenFromAUserService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,

  ) { }

  public async execute(id: string): Promise<Seen[] | null> {
    const content = await this.seenRepository.getAllByUserId(id);

    return content;
  }
}
