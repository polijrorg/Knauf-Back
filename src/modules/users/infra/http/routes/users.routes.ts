import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/create', usersController.create);

usersRoutes.post('/login', usersController.login);

usersRoutes.delete('/delete/:id', usersController.delete);

usersRoutes.get('/getUsers', usersController.getAllUsers);

usersRoutes.get('/rankUsers', usersController.rankUsers);

usersRoutes.patch('/update/:id', usersController.update);

export default usersRoutes;
