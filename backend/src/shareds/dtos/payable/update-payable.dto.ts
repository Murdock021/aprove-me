import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableDto } from './create-payable.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdatePayableDto extends PartialType(CreatePayableDto) {
  @ApiProperty({
    description: 'The value of the payable.',
    example: 100.0,
    required: false,
  })
  @IsNumber({}, { message: 'The value field must be a number.' })
  @IsNotEmpty({ message: 'The value field cannot be empty.' })
  @IsOptional()
  value?: number;

  @ApiProperty({
    description: 'The emission date of the payable.',
    example: '2024-07-20T00:00:00.000Z',
    required: false,
  })
  @IsDateString({}, { message: 'The emissionDate field must be a valid date.' })
  @IsNotEmpty({ message: 'The emissionDate field cannot be empty.' })
  @IsOptional()
  emissionDate?: Date;

  @ApiProperty({
    description: 'The ID of the assignor related to the payable.',
    example: 1,
    required: false,
  })
  @IsNumber({}, { message: 'The assignorId field must be a number.' })
  @IsNotEmpty({ message: 'The assignorId field cannot be empty.' })
  @IsOptional()
  assignorId?: number;
}
