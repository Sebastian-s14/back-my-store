import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Brand, BrandSchema } from 'src/brands/entities/brand.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
    CloudinaryModule,
  ],
})
export class BrandsModule {}
