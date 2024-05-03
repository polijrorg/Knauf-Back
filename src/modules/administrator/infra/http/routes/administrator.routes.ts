import { Router } from 'express';
import AdministratorController from '../controller/AdministratorController';

const administratorRoutes = Router();

const administratorController = new AdministratorController();

administratorRoutes.post('/create', administratorController.create);

administratorRoutes.get('/getAdministrator', administratorController.getAdministrator);

administratorRoutes.post('/login', administratorController.login);

administratorRoutes.patch('/updatePassword/:id', administratorController.updatePassword);

administratorRoutes.patch('/updateLanguage/:id/:newLanguage', administratorController.updateLanguage);

export default administratorRoutes;
