import { Router } from 'express';

import SeenController from '../controller/SeenController';

const seenRoutes = Router();

const seenController = new SeenController();

seenRoutes.post('/create', seenController.create);

seenRoutes.get('/getAll/:id', seenController.getAll);

seenRoutes.get('/getAllFromContent/:id', seenController.getAllFromContent);

seenRoutes.get('/getByUserAndContent/:contentId/:userId', seenController.getByUserAndContent);

seenRoutes.patch('/markAsSeen/:contentId/:userId', seenController.markContentAsSeen);

export default seenRoutes;
