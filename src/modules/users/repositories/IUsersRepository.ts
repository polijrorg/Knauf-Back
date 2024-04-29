import { Users } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  findAllUsers(): Promise<Users[] | null>;
  rankUsers(): Promise<Users[] | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  delete(id: string): Promise<Users>;
  update(id: string, data: IUpdateUserDTO): Promise<Users>;
  changePassword(id: string, newPassword: string): Promise<Users>
}

export default IUsersRepository;
