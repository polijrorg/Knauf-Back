import { inject, injectable } from 'tsyringe';
import { Forum } from '@prisma/client';
import IForumRepository from '../repositories/IForumRepository';

@injectable()
export default class SearchForumService {
  constructor(
    @inject('ForumRepository')
    private forumRepository: IForumRepository,
  ) { }

  public async execute(keywords: string): Promise<Forum[] | null> {
    const forum = await this.forumRepository.search(keywords);

    return forum;
  }
}
