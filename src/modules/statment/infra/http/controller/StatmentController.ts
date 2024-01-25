import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStatmentService from '@modules/statment/services/CreateStatmentService';
import DeleteStatmentService from '@modules/statment/services/DeleteStatmentService';
import GetAllStatmentService from '@modules/statment/services/GetAllStatmentService';
import UpdateImageService from '@modules/statment/services/UpdateImageService';

export default class StatmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { image, text } = req.body;

    const createStatment = container.resolve(CreateStatmentService);

    const statment = await createStatment.execute({ image, text });

    return res.status(201).json(statment);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteStatment = container.resolve(DeleteStatmentService);

    const statment = await deleteStatment.execute({ id });

    return res.status(200).json(statment);
  }

  public async getAllStatment(req: Request, res: Response): Promise<Response> {
    const statments = container.resolve(GetAllStatmentService);

    const statment = await statments.execute();

    return res.status(200).json(statment);
  }

  public async updateImage(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { newImage } = req.body;
    const statments = container.resolve(UpdateImageService);

    const statment = await statments.execute(id, newImage);

    return res.status(200).json(statment);
  }
}
