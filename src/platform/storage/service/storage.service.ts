import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ENV } from '@src/config/env';
import { catchError, from, of, switchMap, tap } from 'rxjs';

type UploadFileDto = {
  fileName: string;
  file: Buffer;
  mimeType: string;
};

@Injectable()
export class StorageService implements OnModuleInit {
  private bucketName = ENV.S3.BUCKET_NAME as string;
  private s3Client: S3Client;

  onModuleInit() {
    this.s3Client = new S3Client({
      endpoint: ENV.S3.ENDPOINT,
      region: ENV.S3.REGION,
      credentials: {
        accessKeyId: ENV.S3.ACCESS_KEY as string,
        secretAccessKey: ENV.S3.SECRET_KEY as string,
      },
      forcePathStyle: true,
    });
  }

  upload(uploadFileDto: UploadFileDto) {
    return of(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uploadFileDto.fileName,
        Body: uploadFileDto.file,
        ContentType: uploadFileDto.mimeType,
        ACL: 'public-read',
      }),
    ).pipe(
      tap((data) => {
        Logger.debug(
          `File uploaded: ${data.input.Key} to bucket: ${this.bucketName}`,
          'StorageService',
        );
      }),
      switchMap((command) => from(this.s3Client.send(command))),
      catchError((err) => {
        console.log(err);
        throw new Error('Failed to upload file');
      }),
    );
  }
}
