import { container } from 'tsyringe';

import './providers';

// Repositorio novo colocar aqui :)

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ModuleRepository from '@modules/module/infra/prisma/repositories/ModuleRepository';
import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import AnswersRepository from '@modules/answers/infra/prisma/repositories/AnswersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository);
container.registerSingleton<IAnswersRepository>('AnswersRepository', AnswersRepository);
