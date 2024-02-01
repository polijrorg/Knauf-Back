import { Router } from 'express';

import CampaignsController from '../controller/CampaignsController';

const campaignsRoutes = Router();

const campaignsController = new CampaignsController();

campaignsRoutes.post('/create', campaignsController.create);

campaignsRoutes.delete('/delete/:id', campaignsController.delete);

campaignsRoutes.get('/getAll', campaignsController.getAll);

export default campaignsRoutes;
