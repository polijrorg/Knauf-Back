import { Router } from 'express';

import QuizzGradesController from '../controller/QuizzGradesController';

const quizzGradesRoutes = Router();

const quizzGradesController = new QuizzGradesController();

quizzGradesRoutes.post('/create', quizzGradesController.create);

quizzGradesRoutes.delete('/delete/:id', quizzGradesController.delete);

quizzGradesRoutes.get('/getSpecific/:quizzId/:userId', quizzGradesController.getSpecific);

quizzGradesRoutes.get('/getAllFromAQuizz/:quizzId', quizzGradesController.getAllFromAQuizz);

quizzGradesRoutes.get('/getAllFromAUser/:userId', quizzGradesController.getAllFromAUser);

quizzGradesRoutes.patch('/update/:id', quizzGradesController.update);

export default quizzGradesRoutes;
