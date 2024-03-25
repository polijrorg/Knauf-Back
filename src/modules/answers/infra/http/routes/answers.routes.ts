import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import AnswersController from '../controller/AnswersController';

const answersRoutes = Router();

const answersController = new AnswersController();

answersRoutes.post('/create', ensureAuthenticated, answersController.create);

answersRoutes.delete('/delete', ensureAuthenticated, answersController.delete);

answersRoutes.get('/getAllFromAUser/:questionId', ensureAuthenticated, answersController.getAllFromAQuestion);

answersRoutes.get('/getAllFromAUser/:userId', ensureAuthenticated, answersController.getAllFromAUser);

answersRoutes.patch('/update/:id', ensureAuthenticated, answersController.update);

export default answersRoutes;
