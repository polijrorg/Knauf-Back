import { Router } from 'express';

import AdminController from '../controller/AdminController';

const adminRoutes = Router();

const adminController = new AdminController();

adminRoutes.post('/create', adminController.create);

adminRoutes.post('/login', adminController.login);

adminRoutes.delete('/delete/:id', adminController.delete);

adminRoutes.get('/getAll', adminController.getAllAdmin);

export default adminRoutes;
