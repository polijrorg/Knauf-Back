import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAnswersService from '@modules/answers/services/CreateAnswersService';
import DeleteAnswersService from '@modules/answers/services/DeleteAnswersService';
import GetAllAnswersFromAQuestionService from '@modules/answers/services/GetAllAnswersFromAQuestionService';
import GetAllAnswersFromAUserService from '@modules/answers/services/GetAllAnswersFromAUserService';
import UpdateAnswersService from '@modules/answers/services/UpdateAnswerService';
import GetAllToApproveService from '@modules/answers/services/GetAllToApproveService';

export default class AnswersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      answer, userId, questionId,
    } = req.body;

    const createAnswers = container.resolve(CreateAnswersService);

    const answers = await createAnswers.execute({
      answer, userId, questionId,
    });

    return res.status(201).json(answers);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAnswers = container.resolve(DeleteAnswersService);

    const answers = await deleteAnswers.execute(id);

    return res.status(200).json(answers);
  }

  public async getAllFromAQuestion(req: Request, res: Response): Promise<Response> {
    const { questionId } = req.params;

    const getAnswers = container.resolve(GetAllAnswersFromAQuestionService);

    const answers = await getAnswers.execute(questionId);

    return res.status(200).json(answers);
  }

  public async getAllToApprove(req: Request, res: Response): Promise<Response> {
    const getAnswers = container.resolve(GetAllToApproveService);

    const answers = await getAnswers.execute();

    return res.status(200).json(answers);
  }

  public async getAllFromAUser(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const getAnswers = container.resolve(GetAllAnswersFromAUserService);

    const answers = await getAnswers.execute(userId);

    return res.status(200).json(answers);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { answer, approved } = req.body;

    const updateAnswers = container.resolve(UpdateAnswersService);

    const answers = await updateAnswers.execute(id, { answer, approved });

    return res.status(200).json(answers);
  }
}
