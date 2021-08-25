import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'user name' })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: 'user lastname' })
  readonly lastname: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'user email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'user password' })
  readonly password: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: 'user role, default role -> user' })
  readonly role: string;

  @IsOptional()
  @ApiProperty({ description: 'user optional photo' })
  readonly photo: string;
}
