import { Forum, Comments, QuizzQuestions } from '@prisma/client';
import ICreateForumDTO from '../dtos/ICreateForumDTO';

interface IForumRepository {
  create(data: ICreateForumDTO): Promise<Forum>;
  getAll(): Promise<Forum[] | null>;
  delete(idForum: string): Promise<Forum | null>;
  addCommentForum(
    idForum: string,
    comment: { text: string; usersId: string }
  ): Promise<Comments>;
  deleteComment(
    idComment: string,
    idForum: string,
    idUser: string
  ): Promise<Comments>;
  search(quizzQuestionId: string): Promise<QuizzQuestions[] | null>;
  updateStatusForum(newStatus: string, idForum: string): Promise<Forum>;
  updateStatusComments(newStatus: string, idComments: string): Promise<Comments>;
}

export default IForumRepository;
