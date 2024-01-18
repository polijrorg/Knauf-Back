import { container } from 'tsyringe';

import './providers';

// Repositorio novo colocar aqui :)

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import IModuleRepository from '@modules/module/repositories/IUsersRepository';
import ModuleRepository from '@modules/module/infra/prisma/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository);
