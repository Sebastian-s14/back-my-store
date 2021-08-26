import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsUrl } from 'class-validator';

import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'brand image' })
  image: string;
}
