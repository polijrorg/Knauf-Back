import { Seen } from '@prisma/client';
import ICreateSeenDTO from '../dtos/ICreateSeenDTO';

interface ISeenRepository {
  findByID(id: string): Promise<Seen | null>;
  create(data: ICreateSeenDTO): Promise<Seen>;
  getAllByUserId(userId: string): Promise<Seen[] | null>;
  markAsSeenByContentId(contentId: string): Promise<Seen>;
}

export default ISeenRepository;
