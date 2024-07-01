import { inject, injectable } from 'tsyringe';
import { Forum } from '@prisma/client';
import IForumRepository from '../repositories/IForumRepository';

interface IRequest {
  newStatus: string;
  idForum: string;
}

@injectable()
class UpdateForumStatusService {
  constructor(
    @inject('ForumRepository')
    private forumRepository: IForumRepository,
  ) {}

  public async execute({ newStatus, idForum }: IRequest): Promise<Forum | null> {
    const updatedForum = await this.forumRepository.updateStatusForum(newStatus, idForum);
    return updatedForum;
  }
}

export default UpdateForumStatusService;
