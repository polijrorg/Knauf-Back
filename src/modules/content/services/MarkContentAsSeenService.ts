import { inject, injectable } from 'tsyringe';

import { Seen } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISeenRepository from '../repositories/ISeenRepository';

@injectable()
export default class MarkContentAsSeenService {
  constructor(
    @inject('SeenRepository')
    private seenRepository: ISeenRepository,
  ) { }

  public async execute(id: string): Promise<Seen> {
    const seenExists = await this.seenRepository.findByID(id);

    if (!seenExists) throw new AppError('A seen with this Id does not exist');

    const content = await this.seenRepository.markAsSeen(id);

    return content;
  }
}
