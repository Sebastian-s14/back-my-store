import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'brand name' })
  readonly name: string;

  // @IsNotEmpty()
  // @ApiProperty({ description: 'brand image' })
  // readonly file: any;
}
