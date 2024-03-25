import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuestionsService from '@modules/questions/services/CreateQuestionsService';
import DeleteQuestionsService from '@modules/questions/services/DeleteQuestionsService';
import GetAllQuestionsService from '@modules/questions/services/GetAllQuestionsService';
import GetAllQuestionsFromAUserService from '@modules/questions/services/GetAllQuestionsFromAUserService';
import UpdateQuestionsService from '@modules/questions/services/UpdateQuestionsService';
import GetAllToApproveByModuleService from '@modules/questions/services/GetAllToApproveByModuleService';
import GetAllToApproveService from '@modules/questions/services/GetAllToApproveService';

export default class QuestionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      question, userId, moduleId,
    } = req.body;

    const createQuestions = container.resolve(CreateQuestionsService);

    const questions = await createQuestions.execute({
      question, userId, moduleId,
    });

    return res.status(201).json(questions);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteQuestion = container.resolve(DeleteQuestionsService);

    const question = await deleteQuestion.execute(id);

    return res.status(200).json(question);
  }

  public async getAllFromAModule(req: Request, res: Response): Promise<Response> {
    const { moduleId } = req.params;

    const getAllModuleQuestions = container.resolve(GetAllQuestionsService);

    const question = await getAllModuleQuestions.execute(moduleId);

    return res.status(200).json(question);
  }

  public async getAllToApproveByModule(req: Request, res: Response): Promise<Response> {
    const { moduleId } = req.params;

    const getAllModuleQuestions = container.resolve(GetAllToApproveByModuleService);

    const question = await getAllModuleQuestions.execute(moduleId);

    return res.status(200).json(question);
  }

  public async getAllToApprove(req: Request, res: Response): Promise<Response> {
    const getAllModuleQuestions = container.resolve(GetAllToApproveService);

    const question = await getAllModuleQuestions.execute();

    return res.status(200).json(question);
  }

  public async getAllFromAUser(req: Request, res: Response): Promise<Response> {
    const { userId, moduleId } = req.params;

    const getAllModuleQuestions = container.resolve(GetAllQuestionsFromAUserService);

    const question = await getAllModuleQuestions.execute(userId, moduleId);

    return res.status(200).json(question);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { question, approved } = req.body;

    const updateQuestions = container.resolve(UpdateQuestionsService);

    const questions = await updateQuestions.execute(id, { question, approved });

    return res.status(200).json(questions);
  }
}
