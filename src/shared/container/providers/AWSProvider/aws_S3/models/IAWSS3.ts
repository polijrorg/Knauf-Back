interface IAWSS3 {
    uploadImagesAWS_S3(payload: string): Promise<string>;
    deleteImagesAWS_S3(payload: string, hashed: string): Promise<boolean>
  }

export default IAWSS3;
