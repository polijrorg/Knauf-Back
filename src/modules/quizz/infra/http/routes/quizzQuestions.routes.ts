import { Router } from 'express';

import QuizzQuestionsController from '../controller/QuizzQuestionsController';

const quizzQuestionsRoutes = Router();

const quizzQuestionsController = new QuizzQuestionsController();

quizzQuestionsRoutes.post('/create', quizzQuestionsController.create);

quizzQuestionsRoutes.delete('/delete/:id', quizzQuestionsController.delete);

quizzQuestionsRoutes.get('/getAllFromAQuizz/:quizzId', quizzQuestionsController.getAll);

quizzQuestionsRoutes.patch('/update/:id', quizzQuestionsController.update);

export default quizzQuestionsRoutes;
