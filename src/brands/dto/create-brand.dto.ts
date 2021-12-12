import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'brand name' })
  readonly name: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: 'brand category' })
  readonly category: string;

  // @IsNotEmpty()
  // @ApiProperty({ description: 'brand image' })
  // readonly file: any;
}
