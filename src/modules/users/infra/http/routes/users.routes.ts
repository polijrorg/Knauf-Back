import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.create);
usersRoutes.delete('/delete/:id', usersController.delete);
usersRoutes.get('/find/:id', usersController.getById);
usersRoutes.get('/getUsers', usersController.getAllUsers);
usersRoutes.get('/rankUsers', usersController.rankUsers);
usersRoutes.patch('/updatePassword/:id', usersController.updatePassword);
usersRoutes.patch('/updateLanguage/:id/:newLanguage', usersController.updateLanguage);

export default usersRoutes;
