import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContentService from '@modules/content/services/CreateContentService';
import DeleteContentService from '@modules/content/services/DeleteContentService';

export default class ContentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      title,
      description,
      linkVideo,
      linkAudio,
      image,
    } = req.body;

    const createContent = container.resolve(CreateContentService);

    const content = await createContent.execute({
      title,
      description,
      linkVideo,
      linkAudio,
      image,
    });

    return res.status(201).json(content);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.body;

    const deleteContent = container.resolve(DeleteContentService);

    const content = await deleteContent.execute({
      id,
    });

    return res.status(201).json(content);
  }
}
