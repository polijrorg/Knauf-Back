import GetAllSeenFromAUserService from '@modules/content/services/GetAllSeenFromAUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSeenService from '@modules/content/services/CreateSeenService';
import MarkContentAsSeenService from '@modules/content/services/MarkContentAsSeenService';

export default class ContentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      contentId, userId,
    } = req.body;

    const createContent = container.resolve(CreateSeenService);

    const content = await createContent.execute({ contentId, userId });

    return res.status(201).json(content);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getAllSeen = container.resolve(GetAllSeenFromAUserService);

    const seen = await getAllSeen.execute(id);

    return res.status(200).json(seen);
  }

  public async markContentAsSeen(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const markContentAsSeen = container.resolve(MarkContentAsSeenService);

    const seen = await markContentAsSeen.execute(id);

    return res.status(200).json(seen);
  }
}
