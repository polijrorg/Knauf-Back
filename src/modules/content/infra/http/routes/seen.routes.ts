import { Router } from 'express';

import SeenController from '../controller/SeenController';

const seenRoutes = Router();

const seenController = new SeenController();

seenRoutes.post('/create', seenController.create);

seenRoutes.get('/getAll/:id', seenController.getAll);

seenRoutes.get('/getAllFromContent/:id', seenController.getAllFromContent);

seenRoutes.patch('/markAsSeen/:id', seenController.markContentAsSeen);

export default seenRoutes;
