import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import CreateForumService from '@modules/forum/services/CreateForumService';
import DeleteForumService from '@modules/forum/services/DeleteForumService';
import GetAllForumService from '@modules/forum/services/GetAllForumService';
import GetUsersService from '@modules/users/services/GetUsersService';
import FindByIdModuleService from '@modules/module/services/FindByIdModuleService';

class ForumController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { idModule, idUser } = req.params;
      const { text } = req.params;
      // Se não tiver todos
      if (!idModule || !idUser || !text) {
        throw new AppError('All fields must be filled', 400);
      }
      const createForumService = container.resolve(CreateForumService);
      const getUsersService = container.resolve(GetUsersService);
      const findByIdModuleService = container.resolve(FindByIdModuleService);
      // Module Existente
      const module = await findByIdModuleService.execute(idModule);
      if (!module) {
        throw new AppError('Module not found', 400);
      }
      // User Existente
      const user = await getUsersService.execute(idUser);
      if (!user) {
        throw new AppError('User not found', 400);
      }
      // Create Forum
      const forum = await createForumService.execute({
        idModule: module.id,
        idUser: user.id,
        text,
      });
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
