import prisma from '@shared/infra/prisma/client';
import { Prisma, Administrator } from '@prisma/client';
import IAdministratorRepository from '@modules/administrator/repositories/IAdministratorRepository';
import ICreateAdministratorDTO from '@modules/administrator/dtos/ICreateAdministratorDTO';

class AdministratorRepository implements IAdministratorRepository {
    private ormRepository: Prisma.AdministratorDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

    constructor() {
      this.ormRepository = prisma.administrator;
    }

    public async create(data: ICreateAdministratorDTO): Promise<Administrator> {
      const administrator = await this.ormRepository.create({ data });
      return administrator;
    }

    public async findAdmin(): Promise<Administrator> {
      const administrator = await this.ormRepository.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return administrator;
    }

    public async findByEmail(email: string): Promise<Administrator | null> {
      const administrator = await this.ormRepository.findFirst({
        where: { OR: [{ email }] },
      });
      return administrator;
    }

    public async updatePassword(id: string, hashedPassword: string): Promise<Administrator> {
      const administrator = this.ormRepository.update({
        where: { id },
        data: { password: hashedPassword },
      });
      return administrator;
    }

    public async updateLanguage(id: string, newLanguage: string): Promise<Administrator> {
      const administrator = this.ormRepository.update({
        where: { id },
        data: { language: newLanguage },
      });
      return administrator;
    }
}

export default AdministratorRepository;
