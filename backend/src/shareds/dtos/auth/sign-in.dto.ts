import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../users';

export class SignInDto extends CreateUserDto {
  @ApiProperty({
    description: 'The user',
    example: 'user',
  })
  login: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword123',
  })
  password: string;
}
