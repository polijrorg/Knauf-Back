import { Admin } from '@prisma/client';

import ICreateAdminDTO from '../dtos/ICreateAdminDTO';

interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  findById(id: string): Promise<Admin | null>;
  getAll(): Promise<Admin[] | null>;
  create(data: ICreateAdminDTO): Promise<Admin>;
  delete(id: string): Promise<Admin>;
}

export default IAdminRepository;
