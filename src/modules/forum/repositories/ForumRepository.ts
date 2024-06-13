import { Forum } from '@prisma/client';
import ICreateForumDTO from '../dtos/ICreateForumDTO';

interface IAdministratorRepository {
    create(data: ICreateForumDTO): Promise<Forum>;

}

export default IAdministratorRepository;
