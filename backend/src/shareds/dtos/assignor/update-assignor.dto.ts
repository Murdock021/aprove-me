import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignorDto } from './create-assignor.dto';
import { IsString, IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAssignorDto extends PartialType(CreateAssignorDto) {
  @IsString()
  @ApiProperty({ example: '898.932.009-70' })
  @IsOptional()
  @MaxLength(30, {
    message: 'The document field cannot be longer than 30 characters.',
  })
  document?: string;

  @IsEmail(
    {},
    { message: 'The email field must contain a valid email address.' },
  )
  @IsOptional()
  @ApiProperty({ example: 'contact@example.com' })
  @MaxLength(140, {
    message: 'The email field cannot be longer than 140 characters.',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '55 2299999-7070' })
  @MaxLength(20, {
    message: 'The phone field cannot be longer than 20 characters.',
  })
  phone?: string;

  @IsString()
  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @MaxLength(140, {
    message: 'The name field cannot be longer than 140 characters.',
  })
  name?: string;
}
