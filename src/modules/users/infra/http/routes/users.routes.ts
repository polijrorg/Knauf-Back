import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/create', usersController.create);

usersRoutes.post('/login', usersController.login);

usersRoutes.delete('/delete/:id', ensureAuthenticated, usersController.delete);

usersRoutes.get('/getUsers', ensureAuthenticated, usersController.getAllUsers);

usersRoutes.get('/rankUsers', ensureAuthenticated, usersController.rankUsers);

usersRoutes.patch('/update/:id', ensureAuthenticated, usersController.update);

usersRoutes.patch('/changePassword/:id', ensureAuthenticated, usersController.changePassword);

export default usersRoutes;
