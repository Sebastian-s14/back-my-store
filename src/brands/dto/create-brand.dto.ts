import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'brand name' })
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ description: 'brand image' })
  readonly image: string;
}
