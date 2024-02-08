import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import ISeenRepository from '../repositories/ISeenRepository';
import ICreateSeenDTO from '../dtos/ICreateSeenDTO';

@injectable()
export default class CreateSeenService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
  ) { }

  public async execute({ contentId, userId }: ICreateSeenDTO): Promise<Seen> {
    const content = await this.seenRepository.create({
      contentId,
      userId,
    });

    return content;
  }
}
