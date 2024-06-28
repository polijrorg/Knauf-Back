import { Forum } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IForumRepository from '../repositories/IForumRepository';

interface IRequest {
  idForum:string
}

@injectable()
class DeleteForumService {
  constructor(
        @inject('ForumRepository')
        private forumRepository: IForumRepository,
  ) {}

  public async execute({ idForum }: IRequest): Promise<Forum | null> {
    const forum = await this.forumRepository.delete(idForum);
    return forum;
  }
}

export default DeleteForumService;
