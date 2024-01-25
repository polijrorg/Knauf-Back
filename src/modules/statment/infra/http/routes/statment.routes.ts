import { Router } from 'express';

import StatmentController from '../controller/StatmentController';

const statmentRoutes = Router();

const statmentController = new StatmentController();

statmentRoutes.post('/create', statmentController.create);

statmentRoutes.delete('/delete/:id', statmentController.delete);

statmentRoutes.get('/getAll', statmentController.getAllStatment);

statmentRoutes.patch('/updateImage/:id', statmentController.updateImage);

export default statmentRoutes;
