import { Seen } from '@prisma/client';
import ICreateSeenDTO from '../dtos/ICreateSeenDTO';

interface ISeenRepository {
  findByID(id: string): Promise<Seen | null>;
  create(data: ICreateSeenDTO): Promise<Seen>;
  getAllByUserId(userId: string): Promise<Seen[] | null>;
  getAllByContentId(contentId: string): Promise<Seen[] | null>;
  getByUserAndContent(userId: string, contentId: string): Promise<Seen | null>;
  markAsSeen(userId: string, contentId: string): Promise<Seen>;
}

export default ISeenRepository;
