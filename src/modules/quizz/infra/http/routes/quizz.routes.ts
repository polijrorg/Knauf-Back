import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import QuizzController from '../controller/QuizzController';

const quizzRoutes = Router();

const quizzController = new QuizzController();

quizzRoutes.post('/create', ensureAuthenticated, quizzController.create);

quizzRoutes.delete('/delete', ensureAuthenticated, quizzController.delete);

quizzRoutes.get('/getAllFromAModule/:moduleId', ensureAuthenticated, quizzController.getAll);

quizzRoutes.patch('/update/:id', ensureAuthenticated, quizzController.update);

export default quizzRoutes;
