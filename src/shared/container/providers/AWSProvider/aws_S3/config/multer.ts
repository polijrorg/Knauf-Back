import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..', 'tmp');

console.log(' a pasta eh: ' + tmpFolder);
console.log('testando aqui');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      //console.log(request);
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
