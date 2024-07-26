import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../users';

export class SignUpDto extends CreateUserDto {
  @ApiProperty({
    description: 'The user',
    example: 'string',
  })
  login: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword123',
  })
  password: string;
}
