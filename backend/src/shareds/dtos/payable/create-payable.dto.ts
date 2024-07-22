import {
  IsNumber,
  IsDateString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePayableDto {
  @ApiProperty({
    description: 'The unique identifier of the payable.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'The id must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'The value of the payable.',
    example: 100.0,
  })
  @IsNumber({}, { message: 'The value must be a number.' })
  @IsNotEmpty({ message: 'The value cannot be empty.' })
  value: number;

  @ApiProperty({
    description: 'The emission date of the payable.',
    example: '2024-07-20T00:00:00.000Z',
  })
  @IsDateString({}, { message: 'The emissionDate field must be a valid date.' })
  @IsNotEmpty({ message: 'The emissionDate field cannot be empty.' })
  emissionDate: Date;

  @ApiProperty({
    description: 'The ID of the assignor related to the payable.',
    example: 1,
  })
  @IsNumber({}, { message: 'The assignorId field must be a number.' })
  @IsNotEmpty({ message: 'The assignorId field cannot be empty.' })
  assignorId: number;
}
