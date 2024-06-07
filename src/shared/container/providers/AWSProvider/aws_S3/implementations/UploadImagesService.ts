import S3Storage from 'utils/S3Storage';
import IAWSS3 from '../models/IAWSS3';

class UploadImagesService {
  async execute(file: Express.Multer.File): Promise<void> {
    const s3Storage = new S3Storage();

    await s3Storage.saveFile(file.filename);
  }
}

export default UploadImagesService;
