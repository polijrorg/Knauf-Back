import aws, { S3 } from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import multerConfig from '../shared/container/providers/AWSProvider/aws_S3/config/multer';

class S3Storage {
    private client: S3;

    constructor() {
      this.client = new aws.S3({
        region: 'us-east-1',
      });
    }

    async saveFile(filename: string): Promise<void> {
      const originalPath = path.resolve(multerConfig.directory, filename);

      try {
        const contentType = mime.lookup(originalPath);

        if (!contentType) {
          throw new Error('File not found');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
          Bucket: 'appsustentabilidade',
          Key: filename,
          Body: fileContent,
          ContentType: contentType,
        }).promise();

        await fs.promises.unlink(originalPath);
      } catch (error) {
        console.error('Error in saveFile:', error);
        throw error;
      }
    }
}

export default S3Storage;
