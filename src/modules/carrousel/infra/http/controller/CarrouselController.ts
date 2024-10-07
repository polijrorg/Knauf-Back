import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadImagesService from '@shared/container/providers/AWSProvider/aws_S3/implementations/UploadImagesService';
import CreateCarrouselService from '@modules/carrousel/services/CreateCarrouselService';
import DeleteCarrouselService from '@modules/carrousel/services/DeleteCarrouselService';
import UpdateCarrouselService from '@modules/carrousel/services/UpdateCarrouselService';
import GetAllCarrouselService from '@modules/carrousel/services/GetAllCarrouselService';
import GetCarrouselByIdService from '@modules/carrousel/services/GetCarrouselByIdService';

export default class CarrouselController {
  public async create(req: Request, res: Response) : Promise<Response> {
    const {
      campaingnId, title, subTitle, language,
    } = req.body;

    const { file } = req;
    let linkImage = '';
    let idImage = '';

    if (file) {
      const uploadImagesService = new UploadImagesService();
      const imageName = await uploadImagesService.execute(file);
      linkImage = `https://appsustentabilidade.s3.amazonaws.com/${imageName}`;
      idImage = imageName;
    } else {
      linkImage = '';
    }

    const createCarrousel = container.resolve(CreateCarrouselService);

    const carrousel = await createCarrousel.execute({
      campaingnId,
      title,
      subTitle,
      language,
      image: linkImage,
    });

    const carrouselObj = { ...carrousel, ...{ idImage } };
    return res.status(201).json(carrouselObj);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCarrousel = container.resolve(DeleteCarrouselService);

    const carrouselDeleted = await deleteCarrousel.execute(id);

    return res.status(200).json(carrouselDeleted);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      title, subTitle, image,
    } = req.body;

    const carrousels = container.resolve(UpdateCarrouselService);

    const carrousel = await carrousels.execute(id, {
      title, subTitle, image,
    });

    return res.status(200).json(carrousel);
  }

  public async getAllCarrousels(req: Request, res: Response): Promise<Response> {
    const carrousels = container.resolve(GetAllCarrouselService);

    const carrousel = await carrousels.execute();

    return res.status(200).json(carrousel);
  }

  public async getCarrouselById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const carrousels = container.resolve(GetCarrouselByIdService);

    const user = await carrousels.execute(id);

    return res.status(200).json(user);
  }
}
