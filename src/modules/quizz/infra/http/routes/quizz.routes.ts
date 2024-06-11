import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';

import QuizzController from '../controller/QuizzController';

const upload = multer(multerConfig);

const quizzRoutes = Router();

const quizzController = new QuizzController();

quizzRoutes.post('/create', upload.single('image'), quizzController.create);

quizzRoutes.delete('/delete/:id', ensureAuthenticated, quizzController.delete);

quizzRoutes.get('/getAllFromAModule/:moduleId/:language', ensureAuthenticated, quizzController.getAll);

quizzRoutes.patch('/update/:id', ensureAuthenticated, quizzController.update);

export default quizzRoutes;
