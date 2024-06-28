import { Router } from 'express';

import ForumController from '../controller/ForumController';

const forumRoutes = Router();

const forumController = new ForumController();

forumRoutes.post('/create/:idModule/:idUser', forumController.create);
forumRoutes.delete('/delete/:idForum', forumController.delete);
forumRoutes.get('/getAll', forumController.getAll);

export default forumRoutes;
