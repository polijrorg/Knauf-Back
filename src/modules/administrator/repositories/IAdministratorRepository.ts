import { Administrator } from '@prisma/client';
import ICreateAdministratorDTO from '../dtos/ICreateAdministratorDTO';

interface IAdministratorRepository {
    create(data: ICreateAdministratorDTO): Promise<Administrator>;
    findAdmin(): Promise<Administrator | null>;
    findByEmail(email: string): Promise<Administrator | null>
    updatePassword(id: string, hashedPassword: string): Promise<Administrator>;
    updateLanguage(id: string, newlanguage: string): Promise<Administrator>;
}

export default IAdministratorRepository;
