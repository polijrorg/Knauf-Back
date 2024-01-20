import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuestionsService from '@modules/questions/services/CreateQuestionsService';
import DeleteQuestionsService from '@modules/questions/services/DeleteQuestionsService';

export default class QuestionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      question,
    } = req.body;

    const createQuestions = container.resolve(CreateQuestionsService);

    const questions = await createQuestions.execute({
      question,
    });

    return res.status(201).json(questions);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.body;

    const deleteQuestion = container.resolve(DeleteQuestionsService);

    const question = await deleteQuestion.execute({
      id,
    });

    return res.status(201).json(question);
  }
}
