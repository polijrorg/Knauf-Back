import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import CampaignsController from '../controller/CampaignsController';

const campaignsRoutes = Router();

const campaignsController = new CampaignsController();

campaignsRoutes.post('/create', ensureAuthenticated, campaignsController.create);

campaignsRoutes.post('/createSeenCampaigns', ensureAuthenticated, campaignsController.createSeenCampaings);

campaignsRoutes.delete('/delete/:id', ensureAuthenticated, campaignsController.delete);

campaignsRoutes.get('/getAll/:language', ensureAuthenticated, campaignsController.getAll);

campaignsRoutes.get('/getAllSeen/:campaignsId', ensureAuthenticated, campaignsController.getAllSeenCampaigns);

campaignsRoutes.patch('/update/:id', ensureAuthenticated, campaignsController.update);

export default campaignsRoutes;
