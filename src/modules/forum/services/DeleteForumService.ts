import { inject, injectable } from 'tsyringe';
import IForumRepository from '../repositories/ForumRepository';

interface IRequest {
  idForum:string
}

@injectable()
class DeleteForumService {
  constructor(
        @inject('ForumRepository')
        private forumRepository: IForumRepository,
  ) {}

  public async execute({ idForum }: IRequest): Promise<void> {
    await this.forumRepository.delete(idForum);
  }
}

export default DeleteForumService;
