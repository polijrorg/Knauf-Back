import { Router } from 'express';

import QuizzController from '../controller/QuizzController';

const quizzRoutes = Router();

const quizzController = new QuizzController();

quizzRoutes.post('/create', quizzController.create);

quizzRoutes.delete('/delete/:id', quizzController.delete);

quizzRoutes.get('/getAllFromAModule/:moduleId', quizzController.getAll);

quizzRoutes.patch('/update/:id', quizzController.update);

export default quizzRoutes;
