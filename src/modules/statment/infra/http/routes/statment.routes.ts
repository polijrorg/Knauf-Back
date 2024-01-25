import { Router } from 'express';

import StatmentController from '../controller/StatmentController';

const statmentRoutes = Router();

const statmentController = new UsersController();

statmentRoutes.post('/register', statmentController.create);

statmentRoutes.delete('/delete', statmentController.delete);

export default statmentRoutes;
