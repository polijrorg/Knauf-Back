import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import ISeenRepository from '../repositories/ISeenRepository';

@injectable()
export default class MarkContentAsSeenService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
  ) { }

  public async execute(contentId:string, userId: string): Promise<Seen> {
    const content = await this.seenRepository.markAsSeen(userId, contentId);

    return content;
  }
}
