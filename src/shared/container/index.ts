import { container } from 'tsyringe';

import './providers';

// Repositorio novo colocar aqui :)

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ModuleRepository from '@modules/module/infra/prisma/repositories/ModuleRepository';

import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import AnswersRepository from '@modules/answers/infra/prisma/repositories/AnswersRepository';

import ICampaignsRepository from '@modules/campaigns/repositories/ICampaignsRepository';
import CampaignsRepository from '@modules/campaigns/infra/prisma/repositories/CampaignsRepository';

import IContentRepository from '@modules/content/repositories/IContentRepository';
import ContentRepository from '@modules/content/infra/prisma/repositories/ContentRepository';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import QuestionsRepository from '@modules/questions/infra/prisma/repositories/QuestionsRepository';

import IStatmentRepository from '@modules/statment/repositories/IStatmentRepository';
import StatmentRepository from '@modules/statment/infra/prisma/repositories/StatmentRepository';

import ISeenRepository from '@modules/content/repositories/ISeenRepository';
import SeenRepository from '@modules/content/infra/prisma/repositories/SeenRepository';

import IQuizzRepository from '@modules/quizz/repositories/IQuizzRepository';
import QuizzRepository from '@modules/quizz/infra/prisma/repositories/QuizzRepository';

import IQuizzGradesRepository from '@modules/quizz/repositories/IQuizzGradesRepository';
import QuizzGradesRepository from '@modules/quizz/infra/prisma/repositories/QuizzGradesRepository';

import IQuizzQuestionsRepository from '@modules/quizz/repositories/IQuizzQuestionsRepository';
import QuizzQuestionsRepository from '@modules/quizz/infra/prisma/repositories/QuizzQuestionsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository);
container.registerSingleton<IAnswersRepository>('AnswersRepository', AnswersRepository);
container.registerSingleton<ICampaignsRepository>('CampaignsRepository', CampaignsRepository);
container.registerSingleton<IContentRepository>('ContentRepository', ContentRepository);
container.registerSingleton<IQuestionsRepository>('QuestionsRepository', QuestionsRepository);
container.registerSingleton<IStatmentRepository>('StatmentRepository', StatmentRepository);
container.registerSingleton<ISeenRepository>('SeenRepository', SeenRepository);
container.registerSingleton<IQuizzRepository>('QuizzRepository', QuizzRepository);
container.registerSingleton<IQuizzGradesRepository>('QuizzGradesRepository', QuizzGradesRepository);
container.registerSingleton<IQuizzQuestionsRepository>('QuizzQuestionsRepository', QuizzQuestionsRepository);
