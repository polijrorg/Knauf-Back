import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Language } from '@prisma/client';

import CreateModuleService from '@modules/module/services/CreateModuleService';
import DeleteModuleService from '@modules/module/services/DeleteModuleService';
import GetAllModulesService from '@modules/module/services/GetAllModulesService';
import UpdateModuleService from '@modules/module/services/UpdateModuleService';
import RankUsersByModuleService from '@modules/module/services/RankUsersByModuleService';
import UploadImagesService from '@shared/container/providers/AWSProvider/aws_S3/implementations/UploadImagesService';

export default class moduleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      language,
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
      linkImage = '';
    }

    const createModule = container.resolve(CreateModuleService);

    const module = await createModule.execute({
      name,
      image: linkImage,
      language,
    });

    const moduleFinal = { ...module, ...{ idImage } };

    return res.status(201).json(moduleFinal);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteModule = container.resolve(DeleteModuleService);

    const module = await deleteModule.execute(id);

    return res.status(200).json(module);
  }

  public async getAllModules(req: Request, res: Response): Promise<Response> {
    const { language } = req.params;
    const validLanguages = Object.values(Language).map((l) => l.toLowerCase()) as Language[];

    if (!validLanguages.includes(language.toLowerCase() as Language)) {
      return res.status(400).json({ error: 'Invalid language provided' });
    }
    const modules = container.resolve(GetAllModulesService);

    const module = await modules.execute(language.toLowerCase() as Language);

    return res.status(200).json(module);
  }

  public async rankUsers(req: Request, res: Response): Promise<Response> {
    const { moduleId } = req.params;

    const modules = container.resolve(RankUsersByModuleService);

    const module = await modules.execute(moduleId);

    return res.status(200).json(module);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, image } = req.body;
    const modules = container.resolve(UpdateModuleService);

    const module = await modules.execute(id, { name, image });

    return res.status(200).json(module);
  }
}
