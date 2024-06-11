import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';

import StatmentController from '../controller/StatmentController';

const upload = multer(multerConfig);

const statmentRoutes = Router();
const statmentController = new StatmentController();

statmentRoutes.post('/create', upload.single('image'), statmentController.create);

statmentRoutes.delete('/delete/:id', ensureAuthenticated, statmentController.delete);

statmentRoutes.get('/getAll/:language', ensureAuthenticated, statmentController.getAll);

statmentRoutes.patch('/update/:id', ensureAuthenticated, statmentController.update);

export default statmentRoutes;
