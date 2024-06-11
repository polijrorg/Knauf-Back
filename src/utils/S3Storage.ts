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

    async saveFile(filename: string): Promise<string> {
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
        // eslint-disable-next-line no-console
        console.error('Error in saveFile:', error);
        throw error;
      }

      return filename;
    }

    async deleteFile(filename: string): Promise<void> {
      await this.client.deleteObject({
        Bucket: 'appsustentabilidade',
        Key: filename,
      }).promise();
    }

    async getFile(filename: string): Promise<void> {
      await this.client.getObject({
        Bucket: 'appsustentabilidade',
        Key: filename,
      }).promise();
    }
}

export default S3Storage;
