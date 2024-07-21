import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export type LocalFileIntercepterOptions = {
  fieldName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
};
