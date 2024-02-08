import { Router } from 'express';

// Imports
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import moduleRoutes from '@modules/module/infra/http/routes/module.routes';
import statmentRoutes from '@modules/statment/infra/http/routes/statment.routes';
import contentRoutes from '@modules/content/infra/http/routes/content.routes';
import campaignsRoutes from '@modules/campaigns/infra/http/routes/campaigns.routes';
import seenRoutes from '@modules/content/infra/http/routes/seen.routes';

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

export default routes;
