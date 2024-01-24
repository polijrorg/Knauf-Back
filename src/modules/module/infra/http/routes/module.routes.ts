import { Router } from 'express';

import ModuleController from '../controller/ModuleController';

const moduleRoutes = Router();

const moduleController = new ModuleController();

moduleRoutes.post('/create', moduleController.create);

moduleRoutes.delete('/delete/:id', moduleController.delete);

moduleRoutes.get('/getModules', moduleController.getAllModules);

moduleRoutes.patch('/updateImage/:id', moduleController.updateImage);

export default moduleRoutes;
