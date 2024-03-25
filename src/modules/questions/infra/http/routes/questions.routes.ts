import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import QuestionsController from '../controller/QuestionsController';

const questionsRoutes = Router();

const questionsController = new QuestionsController();

questionsRoutes.post('/create', ensureAuthenticated, questionsController.create);

questionsRoutes.delete('/delete/:id', ensureAuthenticated, questionsController.delete);

questionsRoutes.get('/getAll/:moduleId', ensureAuthenticated, questionsController.getAllFromAModule);

questionsRoutes.get('/getAllFromAUser/:userId/:moduleId', ensureAuthenticated, questionsController.getAllFromAUser);

questionsRoutes.patch('/update/:id', ensureAuthenticated, questionsController.update);

export default questionsRoutes;
