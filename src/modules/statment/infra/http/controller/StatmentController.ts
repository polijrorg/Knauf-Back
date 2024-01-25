import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStatmentService from '@modules/statment/services/CreateStatmentService';
import DeleteStatmentService from '@modules/statment/services/DeleteStatmentService';

export default class StatmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image,
      text,
    } = req.body;

    const createStatment = container.resolve(CreateStatmentService);

    const statment = await createStatment.execute({
      image,
      text,
    });

    return res.status(201).json(statment);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.body;

    const deleteQuestion = container.resolve(DeleteStatmentService);

    const statment = await deleteQuestion.execute({
      id,
    });

    return res.status(201).json(statment);
  }
}
