import { Router } from 'express';

// Imports

import adminRoutes from '@modules/admin/infra/http/routes/admin.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import moduleRoutes from '@modules/module/infra/http/routes/module.routes';
import statmentRoutes from '@modules/statment/infra/http/routes/statment.routes';
import contentRoutes from '@modules/content/infra/http/routes/content.routes';
import campaignsRoutes from '@modules/campaigns/infra/http/routes/campaigns.routes';
import seenRoutes from '@modules/content/infra/http/routes/seen.routes';
import administratorRoutes from '@modules/administrator/infra/http/routes/administrator.routes';
import questionsRoutes from '@modules/questions/infra/http/routes/questions.routes';
import answersRoutes from '@modules/answers/infra/http/routes/answers.routes';
import quizzRoutes from '@modules/quizz/infra/http/routes/quizz.routes';
import quizzGradesRoutes from '@modules/quizz/infra/http/routes/quizzGrades.routes';
import quizzQuestionsRoutes from '@modules/quizz/infra/http/routes/quizzQuestions.routes';

const routes = Router();

// Admin
routes.use('/admin', adminRoutes);

// Users
routes.use('/users', usersRoutes);

// Module
routes.use('/module', moduleRoutes);

// Statment
routes.use('/statment', statmentRoutes);

// Content and Seen
routes.use('/content', contentRoutes);
routes.use('/seen', seenRoutes);

// Campaigns
routes.use('/campaigns', campaignsRoutes);

// Administrator
routes.use('/administrator', administratorRoutes);

// Questions - from the "Forum"
routes.use('/questions', questionsRoutes);

// Answers - from the "Forum"
routes.use('/answers', answersRoutes);

// Quizz, QuizzGrades and QuizzQuestions
routes.use('/quizz', quizzRoutes);
routes.use('/quizzGrades', quizzGradesRoutes);
routes.use('/quizzQuestions', quizzQuestionsRoutes);

export default routes;
