import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import GetByIdService from '@modules/users/services/GetByIdService';
import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';
import UpdateLanguageService from '@modules/users/services/UpdateLanguageService';
import GetAllUsersService from '@modules/users/services/GetAllUsersService';
import RankUsersService from '@modules/users/services/RankUsersService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
      language,
      name,
      image,
      active,
      score,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      language,
      name,
      image,
      active,
      score,
    });

    user.password = '###';

    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({
      id,
    });

    return res.status(201).json(user);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const users = container.resolve(GetByIdService);

    const user = await users.execute({ id });

    return res.status(201).json(user);
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { newPassword } = req.body;

    const users = container.resolve(UpdatePasswordService);

    const user = await users.execute({ id, newPassword });

    return res.status(201).json(user);
  }

  public async updateLanguage(req: Request, res: Response): Promise<Response> {
    const { id, newLanguage } = req.params;

    const users = container.resolve(UpdateLanguageService);

    const user = await users.execute({ id, newLanguage });

    return res.status(201).json(user);
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = container.resolve(GetAllUsersService);

    const user = await users.execute();

    return res.status(201).json(user);
  }

  public async rankUsers(req: Request, res: Response): Promise<Response> {
    const users = container.resolve(RankUsersService);

    const user = await users.execute();

    return res.status(201).json(user);
  }
}
