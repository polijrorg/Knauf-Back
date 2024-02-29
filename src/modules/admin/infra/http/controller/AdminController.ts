import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateAdminService from '@modules/admin/services/AuthenticateAdminService';
import CreateAdminService from '@modules/admin/services/CreateAdminService';
import DeleteAdminService from '@modules/admin/services/DeleteAdminService';
import GetAllAdminService from '@modules/admin/services/GetAllAdminService';

export default class AdminController {
  public async login(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateUser = container.resolve(AuthenticateAdminService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({ user, token });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
      name,
      image,
    } = req.body;

    const createUser = container.resolve(CreateAdminService);

    const user = await createUser.execute({
      email,
      password,
      name,
      image,
    });

    user.password = '###';

    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteAdminService);

    const user = await deleteUser.execute(id);

    return res.status(200).json(user);
  }

  public async getAllAdmin(req: Request, res: Response): Promise<Response> {
    const users = container.resolve(GetAllAdminService);

    const user = await users.execute();

    return res.status(200).json(user);
  }
}
