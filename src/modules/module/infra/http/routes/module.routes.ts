import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';
import ModuleController from '../controller/ModuleController';

const moduleRoutes = Router();
const upload = multer(multerConfig);
const moduleController = new ModuleController();

moduleRoutes.post('/create', ensureAuthenticated, upload.single('image'), moduleController.create);

moduleRoutes.delete('/delete/:id', ensureAuthenticated, moduleController.delete);

moduleRoutes.get('/getModules/:language', ensureAuthenticated, moduleController.getAllModules);

moduleRoutes.get('/rankUsersByModule/:moduleId', ensureAuthenticated, moduleController.rankUsers);

moduleRoutes.patch('/updateImage/:id', ensureAuthenticated, moduleController.update);

export default moduleRoutes;
