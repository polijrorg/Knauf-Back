import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Language } from '@prisma/client';

import CreateContentService from '@modules/content/services/CreateContentService';
import DeleteContentService from '@modules/content/services/DeleteContentService';
import GetAllContentService from '@modules/content/services/GetAllContentService';
import UpdateContentService from '@modules/content/services/UpdateContentService';
import UploadImagesService from '@shared/container/providers/AWSProvider/aws_S3/implementations/UploadImagesService';

export default class ContentController {
  public async updateImage(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    console.log('File received:', file);

    const uploadImagesService = new UploadImagesService();
    const imageName = await uploadImagesService.execute(file);

    console.log('Image uploaded, name:', imageName);

    return res.status(200).json({ imageName });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      title,
      description,
      linkVideo,
      linkAudio,
      moduleId,
      language,
    } = req.body;

    const { file } = req;
    let linkImage = '';

    if (file) {
      const uploadImagesService = new UploadImagesService();
      const imageName = await uploadImagesService.execute(file);
      linkImage = `https://appsustentabilidade.s3.amazonaws.com/${imageName}`;
    } else {
      linkImage = 'default-image-url';
    }

    const createContent = container.resolve(CreateContentService);

    const content = await createContent.execute({
      title,
      description,
      linkVideo,
      linkAudio,
      image: linkImage,
      moduleId,
      language,
    });

    return res.status(201).json(content);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteContent = container.resolve(DeleteContentService);

    const content = await deleteContent.execute(id);

    return res.status(200).json(content);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { language } = req.params;
    const validLanguages = Object.values(Language).map((l) => l.toLowerCase()) as Language[];

    if (!validLanguages.includes(language.toLowerCase() as Language)) {
      return res.status(400).json({ error: 'Invalid language provided' });
    }
    const findContent = container.resolve(GetAllContentService);

    const content = await findContent.execute(language.toLowerCase() as Language);

    return res.status(200).json(content);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      title, description, linkVideo, linkAudio,
    } = req.body;

    const { file } = req;

    let linkImage = '';

    if (file) {
      const uploadImagesService = new UploadImagesService();
      const imageName = await uploadImagesService.execute(file);
      linkImage = `https://appsustentabilidade.s3.amazonaws.com/${imageName}`;
    } else {
      linkImage = 'default-image-url';
    }

    const updateContent = container.resolve(UpdateContentService);

    const content = await updateContent.execute(id, {
      title, description, linkVideo, linkAudio, image: linkImage,
    });

    return res.status(200).json(content);
  }
}
