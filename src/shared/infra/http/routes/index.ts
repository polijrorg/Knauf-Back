import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import moduleRoutes from '@modules/module/infra/http/routes/module.routes';

const routes = Router();

// Users
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Module
routes.use('/module', moduleRoutes);

export default routes;
