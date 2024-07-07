import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';

import CarrouselController from '../controller/CarrouselController';

const upload = multer(multerConfig);

const carrouselRoutes = Router();
const carrouselController = new CarrouselController();

carrouselRoutes.post('/create', upload.single('image'), ensureAuthenticated, carrouselController.create);

carrouselRoutes.delete('/delete/:id', ensureAuthenticated, carrouselController.delete);

carrouselRoutes.get('/getAllCarrousel', ensureAuthenticated, carrouselController.getAllCarrousels);

carrouselRoutes.get('/findCarrouselById/:id', ensureAuthenticated, carrouselController.getCarrouselById);

carrouselRoutes.patch('/update/:id', ensureAuthenticated, carrouselController.update);

export default carrouselRoutes;
