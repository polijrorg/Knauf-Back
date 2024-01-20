import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAnswersService from '@modules/answers/services/CreateAnswersService';
import DeleteAnswersService from '@modules/answers/services/DeleteAnswersService';

export default class AnswersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      answer,
    } = req.body;

    const createAnswers = container.resolve(CreateAnswersService);

    const answers = await createAnswers.execute({
      answer,
    });

    return res.status(201).json(answers);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.body;

    const deleteAnswers = container.resolve(DeleteAnswersService);

    const answers = await deleteAnswers.execute({
      id,
    });

    return res.status(201).json(answers);
  }
}
