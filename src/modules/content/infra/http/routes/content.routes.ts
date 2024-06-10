import { Router, response } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';
import ContentController from '../controller/ContentController';

const contentController = new ContentController();
const contentRoutes = Router();

const upload = multer(multerConfig);

contentRoutes.post('/uploadImageAWS', upload.single('image'), contentController.updateImage);

contentRoutes.post('/create', upload.single('image'), contentController.create);

contentRoutes.delete('/delete/:id', ensureAuthenticated, contentController.delete);

contentRoutes.get('/find/:language', ensureAuthenticated, contentController.findAll);

contentRoutes.patch('/update/:id', upload.single('image'), contentController.update);

export default contentRoutes;
