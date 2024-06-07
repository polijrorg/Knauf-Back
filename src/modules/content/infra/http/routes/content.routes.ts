import { Router, response } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';

import UploadImagesService from '@shared/container/providers/AWSProvider/aws_S3/implementations/UploadImagesService';

import multer from 'multer';
import multerConfig from '@shared/container/providers/AWSProvider/aws_S3/config/multer';
import ContentController from '../controller/ContentController';


const contentRoutes = Router();

const upload = multer(multerConfig);

contentRoutes.post('/uploadImageAWS', upload.single('image'), async (request, response) => {
  const { file } = request;

  if (!file) {
    return response.status(400).json({ error: 'File is required' });
  }

  const uploadImagesService = new UploadImagesService();

  await uploadImagesService.execute(file);

  return response.send();
});

const contentController = new ContentController();

contentRoutes.post('/create', ensureAuthenticated, contentController.create);

contentRoutes.delete('/delete/:id', ensureAuthenticated, contentController.delete);

contentRoutes.get('/find/:language', ensureAuthenticated, contentController.findAll);

contentRoutes.patch('/update/:id', ensureAuthenticated, contentController.update);

export default contentRoutes;
