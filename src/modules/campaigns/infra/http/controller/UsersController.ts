import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModuleService from '@modules/module/services/CreateModuleService';
import DeleteUserService from '@modules/module/services/DeleteUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      image,
    } = req.body;

    const createModule = container.resolve(CreateModuleService);

    const user = await createModule.execute({
      name,
      image,
    });

    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.body;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({
      id,
    });

    return res.status(201).json(user);
  }
}
