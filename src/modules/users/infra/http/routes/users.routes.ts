import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';

import UsersController from '../controller/UsersController';

const upload = multer(multerConfig);

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/create', upload.single('image'), usersController.create);

usersRoutes.post('/login', usersController.login);

usersRoutes.delete('/delete/:id', ensureAuthenticated, usersController.delete);

usersRoutes.get('/getUsers', ensureAuthenticated, usersController.getAllUsers);

usersRoutes.get('/findById/:id', ensureAuthenticated, usersController.getUser);

usersRoutes.get('/rankUsers', ensureAuthenticated, usersController.rankUsers);

usersRoutes.get('/rankUsersByLanguage', ensureAuthenticated, usersController.rankUsersByLanguage);

usersRoutes.patch('/update/:id', ensureAuthenticated, usersController.update);

usersRoutes.patch('/changePassword/:id', ensureAuthenticated, usersController.changePassword);

export default usersRoutes;
