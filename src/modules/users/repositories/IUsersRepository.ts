import { Users } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  findAllUsers(): Promise<Users[] | null>;
  rankUsers(): Promise<{ name: string; score: number }[] | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  delete(id: string): Promise<Users>;
  updatePassword(id: string, hashedPassword: string): Promise<Users>;
  updateLanguage(id: string, newLanguage: string): Promise<Users>;
}

export default IUsersRepository;
