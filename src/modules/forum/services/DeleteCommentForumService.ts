import { inject, injectable } from 'tsyringe';
import { Comments } from '@prisma/client';
import IForumRepository from '../repositories/IForumRepository';

interface IRequest {
  idForum: string;
  idComment: string;
  idUser: string;
}

@injectable()
class DeleteCommentForumService {
  constructor(
    @inject('ForumRepository')
    private forumRepository: IForumRepository,
  ) {}

  public async execute({ idForum, idComment, idUser }: IRequest): Promise<Comments> {
    const comment = await this.forumRepository.deleteComment(idComment, idForum, idUser);
    return comment;
  }
}

export default DeleteCommentForumService;
