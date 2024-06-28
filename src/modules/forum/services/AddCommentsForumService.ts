import { inject, injectable } from 'tsyringe';
import { Comments } from '@prisma/client';
import IForumRepository from '../repositories/IForumRepository';

interface IRequest {
  idForum: string;
  idUser: string;
  text:string;
}

@injectable()
class AddCommentsForumService {
  constructor(
        @inject('ForumRepository')
        private forumRepository: IForumRepository,
  ) {}

  public async execute({
    idForum, idUser, text,
  }: IRequest): Promise<Comments> {
    const forum = await this.forumRepository.addCommentForum(idForum, {
      text,
      usersId: idUser,
    });

    return forum;
  }
}

export default AddCommentsForumService;
