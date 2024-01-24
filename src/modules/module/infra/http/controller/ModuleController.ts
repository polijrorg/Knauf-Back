import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModuleService from '@modules/module/services/CreateModuleService';
import DeleteModuleService from '@modules/module/services/DeleteModuleService';
import GetAllModulesService from '@modules/module/services/GetAllModulesService';
import UpdateImageService from '@modules/module/services/UpdateImageService';

export default class moduleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      image,
    } = req.body;

    const createModule = container.resolve(CreateModuleService);

    const module = await createModule.execute({
      name,
      image,
    });

    return res.status(201).json(module);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteModule = container.resolve(DeleteModuleService);

    const module = await deleteModule.execute({
      id,
    });

    return res.status(200).json(module);
  }

  public async getAllModules(req: Request, res: Response): Promise<Response> {
    const modules = container.resolve(GetAllModulesService);

    const module = await modules.execute();

    return res.status(200).json(module);
  }

  public async updateImage(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { newImage } = req.body;
    const modules = container.resolve(UpdateImageService);

    const module = await modules.execute(id, newImage);

    return res.status(200).json(module);
  }
}
