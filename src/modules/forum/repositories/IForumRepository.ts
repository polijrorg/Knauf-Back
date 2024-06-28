import { Forum, Comments } from '@prisma/client';
import ICreateForumDTO from '../dtos/ICreateForumDTO';

interface IForumRepository {
  create(data: ICreateForumDTO): Promise<Forum>;
  getAll(): Promise<Forum[] | null>;
  delete(idForum: string): Promise<Forum | null>;
  addCommentForum(idForum: string, comment: { text: string, usersId: string }): Promise<Comments>;
}

export default IForumRepository;
