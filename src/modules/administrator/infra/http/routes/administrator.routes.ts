import { Router } from 'express';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';

import AdministratorController from '../controller/AdministratorController';

const upload = multer(multerConfig);

const administratorRoutes = Router();

const administratorController = new AdministratorController();

administratorRoutes.post('/create', upload.single('image'), administratorController.create);

administratorRoutes.get('/getAdministrator', administratorController.getAdministrator);

administratorRoutes.post('/login', administratorController.login);

administratorRoutes.patch('/updatePassword/:id', upload.single('image'), administratorController.updatePassword);

administratorRoutes.patch('/updateLanguage/:id/:newLanguage', administratorController.updateLanguage);

export default administratorRoutes;
