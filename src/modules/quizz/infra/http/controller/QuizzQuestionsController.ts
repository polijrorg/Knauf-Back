import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuizzQuestionsService from '@modules/quizz/services/CreateQuizzQuestionsService';
import DeleteQuizzQuestionsService from '@modules/quizz/services/DeleteQuizzQuestionsService';
import GetAllQuizzQuestionsService from '@modules/quizz/services/GetAllQuizzQuestionsService';
import UpdateQuizzQuestionsService from '@modules/quizz/services/UpdateQuizzQuestionsService';

export default class QuizzQuestionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      question, answers, rightAnswer, quizzId,
    } = req.body;

    const createAnswers = container.resolve(CreateQuizzQuestionsService);

    const blabla = await createAnswers.execute({
      question, answers, rightAnswer, quizzId,
    });

    return res.status(201).json(blabla);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAnswers = container.resolve(DeleteQuizzQuestionsService);

    const answers = await deleteAnswers.execute(id);

    return res.status(200).json(answers);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { quizzId } = req.params;

    const getAnswers = container.resolve(GetAllQuizzQuestionsService);

    const answers = await getAnswers.execute(quizzId);

    return res.status(200).json(answers);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { question, answers, rightAnswer } = req.body;

    const updateAnswers = container.resolve(UpdateQuizzQuestionsService);

    const blabla = await updateAnswers.execute(id, { question, answers, rightAnswer });

    return res.status(200).json(blabla);
  }
}
