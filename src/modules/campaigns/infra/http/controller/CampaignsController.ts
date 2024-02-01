import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCampaignsService from '@modules/campaigns/services/CreateCampaignsService';
import DeleteCampaignsService from '@modules/campaigns/services/DeleteCampaignsService';
import GetAllCampaignsService from '@modules/campaigns/services/GetAllCampaignsService';

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
    const { id } = req.params;

    const DeleteCampaigns = container.resolve(DeleteCampaignsService);

    const campaign = await DeleteCampaigns.execute({ id });

    return res.status(200).json(campaign);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const getCampaigns = container.resolve(GetAllCampaignsService);

    const campaign = await getCampaigns.execute();

    return res.status(200).json(campaign);
  }
}
