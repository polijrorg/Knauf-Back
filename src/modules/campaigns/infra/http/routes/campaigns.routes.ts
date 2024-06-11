import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';

import CampaignsController from '../controller/CampaignsController';

const upload = multer(multerConfig);

const campaignsRoutes = Router();

const campaignsController = new CampaignsController();

campaignsRoutes.post('/create', upload.single('image'), campaignsController.create);

campaignsRoutes.post('/createSeenCampaigns', ensureAuthenticated, campaignsController.createSeenCampaings);

campaignsRoutes.delete('/delete/:id', ensureAuthenticated, campaignsController.delete);

campaignsRoutes.get('/getAll/:language', ensureAuthenticated, campaignsController.getAll);

campaignsRoutes.get('/getAllSeen/:campaignsId', ensureAuthenticated, campaignsController.getAllSeenCampaigns);

campaignsRoutes.patch('/update/:id', ensureAuthenticated, campaignsController.update);

export default campaignsRoutes;
