import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModuleService from '@modules/module/services/CreateModuleService';
import DeleteModuleService from '@modules/module/services/DeleteModuleService';

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
    const {
      id,
    } = req.body;

    const deleteModule = container.resolve(DeleteModuleService);

    const module = await deleteModule.execute({
      id,
    });

    return res.status(201).json(module);
  }
}
