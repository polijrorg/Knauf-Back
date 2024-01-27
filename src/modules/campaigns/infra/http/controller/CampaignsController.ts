import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCampaignsService from '@modules/campaigns/services/CreateCampaignsService';
import DeleteCampaignsService from '@modules/campaigns/services/DeleteCampaignsService';

export default class CampaignsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image,
      title,
      subtitle,
      text,
    } = req.body;

    const createCampaigns = container.resolve(CreateCampaignsService);

    const campaign = await createCampaigns.execute({
      image,
      title,
      subtitle,
      text,
    });

    return res.status(201).json(campaign);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.body;

    const DeleteCampaigns = container.resolve(DeleteCampaignsService);

    const campaign = await DeleteCampaigns.execute({
      id,
    });

    return res.status(201).json(campaign);
  }
}
