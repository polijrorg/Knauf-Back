import { Router } from 'express';

import QuestionsController from '../controller/QuestionsController';

const questionsRoutes = Router();

const questionsController = new QuestionsController();

questionsRoutes.post('/create', questionsController.create);

questionsRoutes.delete('/delete/:id', questionsController.delete);

questionsRoutes.get('/getAll/:moduleId', questionsController.getAllFromAModule);

questionsRoutes.get('/getAllFromAUser/:userId/:moduleId', questionsController.getAllFromAUser);

questionsRoutes.patch('/update/:id', questionsController.update);

export default questionsRoutes;
