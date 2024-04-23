import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Language } from '@prisma/client';

import CreateQuizzService from '@modules/quizz/services/CreateQuizzService';
import DeleteQuizzService from '@modules/quizz/services/DeleteQuizzService';
import UpdateQuizzService from '@modules/quizz/services/UpdateQuizzService';
import GetAllQuizzFromAModuleService from '@modules/quizz/services/GetAllQuizzFromAModuleService';

export default class QuizzController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, text, amountOfQuestions, moduleId, language,
    } = req.body;

    const createAnswers = container.resolve(CreateQuizzService);

    const answers = await createAnswers.execute({
      image, text, amountOfQuestions, moduleId, language,
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
    const { moduleId, language } = req.params;
    const validLanguages = Object.values(Language).map((l) => l.toLowerCase()) as Language[];

    if (!validLanguages.includes(language.toLowerCase() as Language)) {
      return res.status(400).json({ error: 'Invalid language provided' });
    }

    const getAnswers = container.resolve(GetAllQuizzFromAModuleService);

    const answers = await getAnswers.execute(moduleId, language.toLowerCase() as Language);

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
