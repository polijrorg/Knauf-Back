import { Router } from 'express';

// Imports
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import moduleRoutes from '@modules/module/infra/http/routes/module.routes';
import statmentRoutes from '@modules/statment/infra/http/routes/statment.routes';
import contentRoutes from '@modules/content/infra/http/routes/content.routes';
import campaignsRoutes from '@modules/campaigns/infra/http/routes/campaigns.routes';
import seenRoutes from '@modules/content/infra/http/routes/seen.routes';
import questionsRoutes from '@modules/questions/infra/http/routes/questions.routes';
import answersRoutes from '@modules/answers/infra/http/routes/answers.routes';

const routes = Router();

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

// Questions - from the "Forum"
routes.use('/questions', questionsRoutes);

// Answers - from the "Forum"
routes.use('/answers', answersRoutes);

export default routes;
