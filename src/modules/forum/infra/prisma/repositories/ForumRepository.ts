import prisma from '@shared/infra/prisma/client';
import { Prisma, Forum } from '@prisma/client';
import IForumRepository from '@modules/forum/repositories/IForumRepository';
import ICreateForumDTO from '@modules/forum/dtos/ICreateForumDTO';

class ForumRepository implements IForumRepository {
    private ormRepository: Prisma.ForumDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

    constructor() {
      this.ormRepository = prisma.forum;
    }

    public async getAll(): Promise<Forum[] | null> {
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
              password: false,
            },
          },
        },
      });
      return forum;
    }
}

export default ForumRepository;
