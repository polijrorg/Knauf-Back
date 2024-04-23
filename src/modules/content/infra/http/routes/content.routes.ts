import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import ContentController from '../controller/ContentController';

const contentRoutes = Router();

const contentController = new ContentController();

contentRoutes.post('/create', ensureAuthenticated, contentController.create);

contentRoutes.delete('/delete/:id', ensureAuthenticated, contentController.delete);

contentRoutes.get('/find/:language', ensureAuthenticated, contentController.findAll);

contentRoutes.patch('/update/:id', ensureAuthenticated, contentController.update);

export default contentRoutes;
