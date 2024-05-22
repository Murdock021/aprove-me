import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @IsNotEmpty({ message: 'The document field is required.' })
  @MaxLength(30, { message: 'The document field cannot exceed 30 characters.' })
  document: string;

  @IsEmail(
    {},
    { message: 'The email field must contain a valid email address.' },
  )
  @IsNotEmpty({ message: 'The email field is required.' })
  @MaxLength(140, { message: 'The email field cannot exceed 140 characters.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'The phone field is required.' })
  @MaxLength(20, { message: 'The phone field cannot exceed 20 characters.' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'The name field is required.' })
  @MaxLength(140, { message: 'The name field cannot exceed 140 characters.' })
  name: string;
}
