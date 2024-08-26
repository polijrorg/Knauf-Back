import { Router } from 'express';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import AdministratorController from '../controller/AdministratorController';

const upload = multer(multerConfig);

const administratorRoutes = Router();

const administratorController = new AdministratorController();

administratorRoutes.post('/create', upload.single('image'), administratorController.create);

administratorRoutes.get('/getAdministrator', administratorController.getAdministrator);

administratorRoutes.post('/login', administratorController.login);

administratorRoutes.patch('/updatePassword/:id', upload.single('image'), ensureAuthenticated, administratorController.updatePassword);

administratorRoutes.patch('/updateLanguage/:id/:newLanguage', ensureAuthenticated, administratorController.updateLanguage);

administratorRoutes.patch('/resetPasswordUserById/:id', ensureAuthenticated, administratorController.resetPasswordUserById);

administratorRoutes.patch('/resetAllUsersPasswords', ensureAuthenticated, administratorController.resetPasswordsToAllUsers);

export default administratorRoutes;
