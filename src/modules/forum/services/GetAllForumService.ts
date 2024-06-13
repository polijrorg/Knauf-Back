import { inject, injectable } from 'tsyringe';
import { Forum } from '@prisma/client';
import IForumRepository from '../repositories/IForumRepository';

@injectable()
class GetAllForumService {
  constructor(
        @inject('ForumRepository')
        private forumRepository: IForumRepository,
  ) {}

  public async execute(): Promise<Forum[] | null> {
    const forum = await this.forumRepository.getAll();
    return forum;
  }
}

export default GetAllForumService;
