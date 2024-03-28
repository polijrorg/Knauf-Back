import { Seen } from '@prisma/client';
import ICreateSeenDTO from '../dtos/ICreateSeenDTO';

interface ISeenRepository {
  findByID(id: string): Promise<Seen | null>;
  create(data: ICreateSeenDTO): Promise<Seen>;
  getAllByUserId(userId: string): Promise<Seen[] | null>;
  getAllByContentId(moduleId: string): Promise<Seen[] | null>;
  markAsSeen(id: string): Promise<Seen>;
}

export default ISeenRepository;
