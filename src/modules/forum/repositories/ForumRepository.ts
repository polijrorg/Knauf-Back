import { Forum } from '@prisma/client';
import ICreateForumDTO from '../dtos/ICreateForumDTO';

interface IAdministratorRepository {
    create(data: ICreateForumDTO): Promise<Forum>;
    getAll(): Promise<Forum[]>;
    delete(idForum: string): Promise<Forum | null>;
}

export default IAdministratorRepository;
