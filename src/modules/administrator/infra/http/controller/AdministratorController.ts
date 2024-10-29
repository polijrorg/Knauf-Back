import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateAdministratorService from '@modules/administrator/services/AuthenticateAdministratorService';
import CreateAdministratorService from '@modules/administrator/services/CreateAdministratorService';
import GetAdministratorService from '@modules/administrator/services/GetAdministratorService';
import UpdateLanguageService from '@modules/administrator/services/UpdateLanguageService';
import UpdatePasswordService from '@modules/administrator/services/UpdatePasswordService';
import UploadImagesService from '@shared/container/providers/AWSProvider/aws_S3/implementations/UploadImagesService';
import ResetPasswordUserByIdService from '@modules/administrator/services/ResetPasswordUserByIdService';
import ResetPasswordForAllUsersService from '@modules/administrator/services/ResetPasswordForAllUsersService';

class AdministratorController {
  public async login(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateAdministrator = container.resolve(AuthenticateAdministratorService);

    const { administrator, token } = await authenticateAdministrator.execute({ email, password });

    return res.json({ administrator, token });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
      language,
      name,
    } = req.body;

    const { file } = req;
    let linkImage = '';
    let idImage = '';

    if (file) {
      const uploadImagesService = new UploadImagesService();
      const imageName = await uploadImagesService.execute(file);
      linkImage = `https://appsustentabilidade.s3.amazonaws.com/${imageName}`;
      idImage = imageName;
    } else {
      linkImage = 'https://appsustentabilidade.s3.amazonaws.com/dcf9f47523abefbdd013-imagePadraoKnauf.jpeg';
    }

    const createAdministrator = container.resolve(CreateAdministratorService);

    const administrator = await createAdministrator.execute({
      name,
      email,
      password,
      language,
      image: linkImage,
    });

    const administratorFinal = { ...administrator, ...{ idImage } };

    administrator.password = '###';

    return res.status(201).json(administratorFinal);
  }

  public async getAdministrator(req: Request, res: Response): Promise<Response> {
    const administratorS = container.resolve(GetAdministratorService);
    const administrator = await administratorS.execute();
    return res.status(200).json(administrator);
  }

  public async updateLanguage(req: Request, res: Response): Promise<Response> {
    const { id, newLanguage } = req.params;
    const administrators = container.resolve(UpdateLanguageService);
    const administrator = await administrators.execute({ id, newLanguage });
    return res.status(200).json(administrator);
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { newPassword } = req.body;
    const administratorS = container.resolve(UpdatePasswordService);
    const administrator = await administratorS.execute({ id, newPassword });
    return res.status(200).json(administrator);
  }

  public async resetPasswordUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const changePasswordUser = container.resolve(ResetPasswordUserByIdService);
    const user = await changePasswordUser.execute(id);
    return res.status(200).json(user);
  }

  public async resetPasswordsToAllUsers(req: Request, res: Response): Promise<Response> {
    const changePasswordAllUsers = container.resolve(ResetPasswordForAllUsersService);
    const users = await changePasswordAllUsers.execute();
    return res.status(200).json(users);
  }
}

export default AdministratorController;
