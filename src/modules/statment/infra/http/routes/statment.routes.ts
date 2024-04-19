import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import StatmentController from '../controller/StatmentController';

const statmentRoutes = Router();

const statmentController = new StatmentController();

statmentRoutes.post('/create', ensureAuthenticated, statmentController.create);

statmentRoutes.delete('/delete/:id', ensureAuthenticated, statmentController.delete);

statmentRoutes.delete('/deleteAll', ensureAuthenticated, statmentController.deleteAll);

statmentRoutes.get('/getAll', ensureAuthenticated, statmentController.getAll);

statmentRoutes.patch('/update/:id', ensureAuthenticated, statmentController.update);

export default statmentRoutes;
