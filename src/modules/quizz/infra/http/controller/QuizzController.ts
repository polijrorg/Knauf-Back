import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuizzService from '@modules/quizz/services/CreateQuizzService';
import DeleteQuizzService from '@modules/quizz/services/DeleteQuizzService';
import UpdateQuizzService from '@modules/quizz/services/UpdateQuizzService';
import GetAllQuizzFromAModuleService from '@modules/quizz/services/GetAllQuizzFromAModuleService';

export default class QuizzController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, text, questions, amountOfQuestions, moduleId,
    } = req.body;

    const createAnswers = container.resolve(CreateQuizzService);

    const answers = await createAnswers.execute({
      image, text, questions, amountOfQuestions, moduleId,
    });

    return res.status(201).json(answers);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAnswers = container.resolve(DeleteQuizzService);

    const answers = await deleteAnswers.execute(id);

    return res.status(200).json(answers);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { moduleId } = req.params;

    const getAnswers = container.resolve(GetAllQuizzFromAModuleService);

    const answers = await getAnswers.execute(moduleId);

    return res.status(200).json(answers);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { image, text, amountOfQuestions } = req.body;

    const updateAnswers = container.resolve(UpdateQuizzService);

    const answers = await updateAnswers.execute(id, { image, text, amountOfQuestions });

    return res.status(200).json(answers);
  }
}
