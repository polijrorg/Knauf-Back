import { Router } from 'express';

import QuizzGradesController from '../controller/QuizzGradesController';

const quizzGradesRoutes = Router();

const quizzGradesController = new QuizzGradesController();

quizzGradesRoutes.post('/create', quizzGradesController.create);

quizzGradesRoutes.delete('/delete', quizzGradesController.delete);

quizzGradesRoutes.get('/getAllFromAModule/:quizzId/:userId', quizzGradesController.get);

quizzGradesRoutes.patch('/update/:id', quizzGradesController.update);

export default quizzGradesRoutes;
