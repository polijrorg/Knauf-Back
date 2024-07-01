import { Router } from 'express';

import ForumController from '../controller/ForumController';
import ensureAuthenticated from '../../../../../shared/infra/middlewares/EnsureAuthenticated';

const forumRoutes = Router();

const forumController = new ForumController();

forumRoutes.post('/create/:idModule', ensureAuthenticated, forumController.create);
forumRoutes.get('/getAll', ensureAuthenticated, forumController.getAll);
forumRoutes.delete('/delete/:idForum', ensureAuthenticated, forumController.delete);
forumRoutes.post('/:idForum', ensureAuthenticated, forumController.addCommentsForum);
forumRoutes.delete('/:idForum/:idComment', ensureAuthenticated, forumController.deleteComment);
forumRoutes.post('/comment/updateStatus/:idComment', ensureAuthenticated, forumController.updateStatusComments);
forumRoutes.delete('/forum/updateStatus/:idForum', ensureAuthenticated, forumController.updateStatusForum);
forumRoutes.get('/search', forumController.getSearch);

export default forumRoutes;
