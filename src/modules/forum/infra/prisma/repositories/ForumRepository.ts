import prisma from '@shared/infra/prisma/client';
import {
  Prisma, Forum, Comments, Status,
} from '@prisma/client';
import IForumRepository from '@modules/forum/repositories/IForumRepository';
import ICreateForumDTO from '@modules/forum/dtos/ICreateForumDTO';

class ForumRepository implements IForumRepository {
  private ormRepository: Prisma.ForumDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.forum;
  }

  public async updateStatusForum(newStatus: string, idForum: string, score: number): Promise<Forum> {
    const updatedForum = await prisma.forum.update({
      where: { id: idForum },
      data: { status: newStatus as Status },
    });

    const userId = updatedForum.usersId;
    const user = await prisma.users.findUnique({ where: { id: userId } });
    const moduleGrade = await prisma.moduleGrades.findFirst({ where: { userId, moduleId: updatedForum?.moduleId } });

    if (user && newStatus === 'approved') {
      const newScore = Math.floor(user.score + score);
      await prisma.users.update({ where: { id: userId }, data: { score: newScore } });

      if (moduleGrade) {
        const newGrade = Math.floor(moduleGrade.grade + score);
        await prisma.moduleGrades.update({ where: { id: moduleGrade.id }, data: { grade: newGrade } });
      }
    }

    return updatedForum;
  }

  public async updateStatusComments(newStatus: string, idComments: string): Promise<Comments> {
    const updatedComment = await prisma.comments.update({
      where: { id: idComments },
      data: { status: newStatus as Status },
    });
    return updatedComment;
  }

  public async deleteComment(idComment: string, idForum: string, idUser: string): Promise<Comments> {
    const comment = await prisma.comments.findFirst({
      where: {
        id: idComment,
        forumId: idForum,
        usersId: idUser,
      },
    });

    if (!comment) {
      throw new Error('Comentário não encontrado ou não pertence ao fórum especificado.');
    }

    const deletedComment = await prisma.comments.delete({
      where: { id: idComment },
    });

    return deletedComment;
  }

  public async addCommentForum(idForum: string, comment: { text: string, usersId: string }): Promise<Comments> {
    const createdComment = await prisma.comments.create({
      data: {
        text: comment.text,
        usersId: comment.usersId,
        forumId: idForum,
        status: 'pending',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            seen: true,
          },
        },
      },
    });
    return createdComment;
  }

  public async delete(idForum: string): Promise<Forum | null> {
    const forum = await this.ormRepository.findUnique({ where: { id: idForum } });
    await this.ormRepository.delete({
      where: { id: forum?.id },
    });
    return forum;
  }

  public async getAll(): Promise<Forum[] | null> {
    const foruns = this.ormRepository.findMany({
      include: {
        module: true,
        comments: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            active: true,
            score: true,
            seen: true,
            image: true,
          },
        },
      },
    });
    return foruns;
  }

  public async create(data: ICreateForumDTO): Promise<Forum> {
    const {
      idModule, idUser, text,
    } = data;
    const forum = await this.ormRepository.create({
      data: {
        comments: { create: [] }, // Quando cria o Forum, cria o comments vazio
        text,
        module: { connect: { id: idModule } },
        user: { connect: { id: idUser } },
      },
      include: {
        module: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            active: true,
            score: true,
            seen: true,
            image: true,
          },
        },
      },
    });
    return forum;
  }

  public async search(keywords: string): Promise<Forum[] | null> {
    const forum_search = await this.ormRepository.findMany({
      where: {
        text: {
          contains: keywords,
          mode: 'insensitive',
        },
      },
    });

    return forum_search;
  }
}

export default ForumRepository;
