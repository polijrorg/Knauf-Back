import { Forum } from '@prisma/client';
import ICreateForumDTO from '../dtos/ICreateForumDTO';

interface IForumRepository {
    create(data: ICreateForumDTO): Promise<Forum>;
    getAll(): Promise<Forum[] | null>;
    delete(idForum: string): Promise<Forum | null>;
}

export default IForumRepository;
