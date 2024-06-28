import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import CreateForumService from '@modules/forum/services/CreateForumService';
import AddCommentsForumService from '@modules/forum/services/AddCommentsForumService';
import GetAllForumService from '@modules/forum/services/GetAllForumService';
import DeleteForumService from '@modules/forum/services/DeleteForumService';
import GetUsersService from '@modules/users/services/GetUsersService';
import FindByIdModuleService from '@modules/module/services/FindByIdModuleService';

class ForumController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { idModule, idUser } = req.params;
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
      const { idForum, idUser } = req.params;
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
}

export default ForumController;
