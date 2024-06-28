import prisma from '@shared/infra/prisma/client';
import { Prisma, Forum } from '@prisma/client';
import IAForumRepository from '@modules/forum/repositories/ForumRepository';
import ICreateForumDTO from '@modules/forum/dtos/ICreateForumDTO';

class ForumRepository implements IAForumRepository {
    private ormRepository: Prisma.ForumDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

    constructor() {
      this.ormRepository = prisma.forum;
    }

    public async delete(idForum: string): Promise<Forum | null> {
      const forum = await this.ormRepository.findUnique({ where: { id: idForum } });
      await this.ormRepository.delete({
        where: { id: forum?.id },
      });
      return forum;
    }

    public async getAll(): Promise<Forum[]> {
      return this.ormRepository.findMany();
    }

    public async create(data: ICreateForumDTO): Promise<Forum> {
      const {
        idModule, idUser, text,
      } = data;
      const forum = await this.ormRepository.create({
        data: {
          coments: '', // Lembra de Alterar aqui
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
            },
          },
        },
      });
      return forum;
    }
}

export default ForumRepository;
