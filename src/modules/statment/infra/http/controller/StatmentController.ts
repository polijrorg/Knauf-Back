import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStatmentService from '@modules/statment/services/CreateStatmentService';
import DeleteStatmentService from '@modules/statment/services/DeleteStatmentService';
import GetAllStatmentService from '@modules/statment/services/GetAllStatmentService';
import UpdateStatmentService from '@modules/statment/services/UpdateStatmentService';

export default class StatmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, text, title, language,
    } = req.body;

    const createStatment = container.resolve(CreateStatmentService);

    const statment = await createStatment.execute({
      image, text, title, language,
    });

    return res.status(201).json(statment);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteStatment = container.resolve(DeleteStatmentService);

    const statment = await deleteStatment.execute({ id });

    return res.status(200).json(statment);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { language } = req.body;
    const statments = container.resolve(GetAllStatmentService);

    const statment = await statments.execute(language);

    return res.status(200).json(statment);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { text, title, image } = req.body;
    const statments = container.resolve(UpdateStatmentService);

    const statment = await statments.execute(id, { text, title, image });

    return res.status(200).json(statment);
  }
}
