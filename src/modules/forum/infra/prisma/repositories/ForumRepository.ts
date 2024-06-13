import prisma from '@shared/infra/prisma/client';
import { Prisma, Forum } from '@prisma/client';
import IAForumRepository from '@modules/forum/repositories/ForumRepository';
import ICreateForumDTO from '@modules/forum/dtos/ICreateForumDTO';

class ForumRepository implements IAForumRepository {
    private ormRepository: Prisma.ForumDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

    constructor() {
      this.ormRepository = prisma.forum;
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
              password: false,
            },
          },
        },
      });
      return forum;
    }
}

export default ForumRepository;
