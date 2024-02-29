import prisma from '@shared/infra/prisma/client';
import { Prisma, Admin } from '@prisma/client';

import IAdminRepository from '@modules/admin/repositories/IAdminRepository';
import ICreateAdminDTO from '@modules/admin/dtos/ICreateAdminDTO';

export default class AdminRepository implements IAdminRepository {
  private ormRepository: Prisma.AdminDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.admin;
  }

  public async findByEmail(email: string): Promise<Admin | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: [{ email }] },
    });

    return user;
  }

  public async findById(id: string): Promise<Admin | null> {
    const user = await this.ormRepository.findUnique({
      where: { id },
    });

    return user;
  }

  public async create(data: ICreateAdminDTO): Promise<Admin> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async delete(id: string): Promise<Admin> {
    const user = await this.ormRepository.delete({ where: { id } });

    return user;
  }

  public async getAll(): Promise<Admin[] | null> {
    const user = await this.ormRepository.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return user;
  }
}
