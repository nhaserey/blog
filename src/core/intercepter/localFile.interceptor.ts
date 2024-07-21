import { Injectable, NestInterceptor, Type, mixin } from '@nestjs/common';
import { LocalFileIntercepterOptions } from '../type/localFileIntercepterOptions';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

function LocalFileIntercepter(
  options: LocalFileIntercepterOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileIntercepter: NestInterceptor;
    constructor(configService: ConfigService) {
      const fileDestination = configService.get<string>('UPLOAD_PATH');

      const destination = `${fileDestination}${options.path}`;
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
        fileFilter: options.fileFilter,
        limits: options.limits,
      };
      this.fileIntercepter = new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))();
    }
    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileIntercepter.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFileIntercepter;
