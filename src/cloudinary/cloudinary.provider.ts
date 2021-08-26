import { Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 } from 'cloudinary';
import config from 'src/config';

export const CLOUDINARY = 'Cloudinary';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigType<typeof config>) => {
    // console.log(configService.cloudinary);
    const { cloud_name, api_key, api_secret } = configService.cloudinary;
    return v2.config({
      cloud_name,
      api_key,
      api_secret,
    });
  },
  inject: [config.KEY],
};
