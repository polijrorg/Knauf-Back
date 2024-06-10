import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Language } from '@prisma/client';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import GetAllUsersService from '@modules/users/services/GetAllUsersService';
import GetUsersService from '@modules/users/services/GetUsersService';
import RankUsersService from '@modules/users/services/RankUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ChangePasswordUserService from '@modules/users/services/ChangePasswordUserService';
import RankUsersByLanguageService from '@modules/users/services/RankUsersByLanguageService';
import UploadImagesService from '@shared/container/providers/AWSProvider/aws_S3/implementations/UploadImagesService';

export default class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({ user, token });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
      language,
      name,
      active,
      score,
    } = req.body;

    const { file } = req;
    let linkImage = '';

    if (file) {
      const uploadImagesService = new UploadImagesService();
      const imageName = await uploadImagesService.execute(file);
      linkImage = `https://appsustentabilidade.s3.amazonaws.com/${imageName}`;
    } else {
      linkImage = 'https://i.imgur.com/4AVhMxk.png';
    }

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      language,
      name,
      image: linkImage,
      active: active === 'true', // Converter para Boolean,
      score: Number(score),
    });

    user.password = '###';

    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute(id);

    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      password, name, image, active, score,
    } = req.body;

    const users = container.resolve(UpdateUserService);

    const user = await users.execute(id, {
      password, name, image, active, score,
    });

    return res.status(200).json(user);
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = container.resolve(GetAllUsersService);

    const user = await users.execute();

    return res.status(200).json(user);
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const users = container.resolve(GetUsersService);

    const user = await users.execute(id);

    return res.status(200).json(user);
  }

  public async rankUsers(req: Request, res: Response): Promise<Response> {
    const users = container.resolve(RankUsersService);

    const user = await users.execute();

    return res.status(200).json(user);
  }

  public async rankUsersByLanguage(req: Request, res: Response): Promise<Response> {
    const { language } = req.body;

    const users = container.resolve(RankUsersByLanguageService);

    const user = await users.execute(language as Language);

    return res.status(200).json(user);
  }

  public async changePassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const users = container.resolve(ChangePasswordUserService);

    const user = await users.execute(id, oldPassword, newPassword);

    return res.status(200).json(user);
  }
}
