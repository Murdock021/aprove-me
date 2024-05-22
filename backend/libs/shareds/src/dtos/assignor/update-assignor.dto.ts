import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignorDto } from './create-assignor.dto';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {
  @IsString()
  @IsNotEmpty({ message: 'The document field cannot be empty.' })
  @MaxLength(25, {
    message: 'The document field cannot be longer than 25 characters.',
  })
  @IsOptional()
  document?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'The email field cannot be empty.' })
  @MaxLength(140, {
    message: 'The email field cannot be longer than 140 characters.',
  })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'The phone field cannot be empty.' })
  @MaxLength(20, {
    message: 'The phone field cannot be longer than 20 characters.',
  })
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  @MaxLength(140, {
    message: 'The name field cannot be longer than 140 characters.',
  })
  @IsOptional()
  name?: string;
}
