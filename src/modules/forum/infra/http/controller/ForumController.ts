import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import CreateForumService from '@modules/forum/services/CreateForumService';
import UpdateForumStatusService from '@modules/forum/services/UpdateForumStatusService';
import UpdateCommentsStatusService from '@modules/forum/services/UpdateCommentsStatusService';
import AddCommentsForumService from '@modules/forum/services/AddCommentsForumService';
import DeleteCommentForumService from '@modules/forum/services/DeleteCommentForumService';
import GetAllForumService from '@modules/forum/services/GetAllForumService';
import DeleteForumService from '@modules/forum/services/DeleteForumService';
import GetUsersService from '@modules/users/services/GetUsersService';
import FindByIdModuleService from '@modules/module/services/FindByIdModuleService';
import SearchForumService from '@modules/forum/services/SearchForumService';

class ForumController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id: idUser } = req.token;
      const { idModule } = req.params;
      const { text } = req.body;

      if (!idModule || !idUser || !text) {
        throw new AppError('All fields must be filled', 400);
      }

      const findByIdModuleService = container.resolve(FindByIdModuleService);
      const module = await findByIdModuleService.execute(idModule);
      if (!module) {
        throw new AppError('Module not found', 400);
      }

      const getUsersService = container.resolve(GetUsersService);
      const user = await getUsersService.execute(idUser);
      if (!user) {
        throw new AppError('User not found', 400);
      }

      const createForumService = container.resolve(CreateForumService);
      const forum = await createForumService.execute({ idModule: module.id, idUser: user.id, text });
      return res.status(201).json(forum);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  public async deleteComment(req: Request, res: Response): Promise<Response> {
    try {
      const { idForum, idComment } = req.params;
      const { id: idUser } = req.token;

      const deleteCommentForumService = container.resolve(DeleteCommentForumService);
      const comments = await deleteCommentForumService.execute({ idForum, idComment, idUser });
      return res.status(200).json(comments);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const getAllForumService = container.resolve(GetAllForumService);
      const foruns = await getAllForumService.execute();
      return res.status(200).json(foruns);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  public async addCommentsForum(req: Request, res: Response): Promise<Response> {
    try {
      const { id: idUser } = req.token;
      const { idForum } = req.params;
      const { text } = req.body;

      const getUsersService = container.resolve(GetUsersService);
      const user = await getUsersService.execute(idUser);
      if (!user) {
        throw new AppError('User not found', 400);
      }

      const addCommentsForumService = container.resolve(AddCommentsForumService);
      const comments = await addCommentsForumService.execute({ idForum, idUser, text });
      return res.status(200).json(comments);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { idForum } = req.params;
      const deleteForumService = container.resolve(DeleteForumService);
      const forum = await deleteForumService.execute({ idForum });
      return res.status(200).json(forum);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  public async updateStatusForum(req: Request, res: Response): Promise<Response> {
    try {
      const { idForum } = req.params;
      const { status } = req.body;
      const updateForumStatusService = container.resolve(UpdateForumStatusService);
      const forum = await updateForumStatusService.execute({ idForum, newStatus: status });
      return res.status(200).json(forum);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  public async updateStatusComments(req: Request, res: Response): Promise<Response> {
    try {
      const { idComment } = req.params;
      const { status } = req.body;
      const updateCommentsStatusService = container.resolve(UpdateCommentsStatusService);
      const comment = await updateCommentsStatusService.execute({ idComments: idComment, newStatus: status });
      return res.status(200).json(comment);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  public async getSearch(req: Request, res: Response): Promise<Response> {
    const text = req.query.q;

    const query = container.resolve(SearchForumService);
    const quizzQuestions = await query.execute(text);
    return res.status(200).json(quizzQuestions);
  }
}

export default ForumController;
