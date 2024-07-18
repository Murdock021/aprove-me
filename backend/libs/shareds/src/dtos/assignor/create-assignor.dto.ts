import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @IsNotEmpty({ message: 'The document field is required.' })
  @MaxLength(30, {
    message: 'The document field cannot be longer than 30 characters.',
  })
  document: string;

  @IsEmail(
    {},
    { message: 'The email field must contain a valid email address.' },
  )
  @IsNotEmpty({ message: 'The email field is required.' })
  @ApiProperty({ example: 'contact@example.com' })
  @MaxLength(140, {
    message: 'The email field cannot be longer than 140 characters.',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'The phone field is required.' })
  @ApiProperty({ example: '55 2299999-7070' })
  @MaxLength(20, {
    message: 'The phone field cannot be longer than 20 characters.',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'The name field is required.' })
  @MaxLength(125, {
    message: 'The name field cannot be longer than 125 characters.',
  })
  name: string;
}
