import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { SignInDto, SignUpDto } from 'src/shareds';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME: string;
  private ISSUER: string;
  private AUDIENCE: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.EXPIRATION_TIME = this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
    );
    this.ISSUER = this.configService.get<string>('JWT_ISSUER');
    this.AUDIENCE = this.configService.get<string>('JWT_AUDIENCE');
  }

  async signUp(signUpDto: SignUpDto) {
    const { login } = signUpDto;
    const user = await this.usersService.findLogin(login);

    if (user !== null) {
      throw new ConflictException('Login already in use!');
    }

    return await this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { login, password } = signInDto;
    const user = await this.usersService.findLogin(login);

    if (!user) throw new UnauthorizedException('Login or password not valid.');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Login or password not valid.');

    const token = await this.createToken(user);
    return await this.usersService.createSession(user.id, token);
  }

  createToken(user: User) {
    const { id, login } = user;

    const token = this.jwtService.sign(
      { login },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );
    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: this.AUDIENCE,
      issuer: this.ISSUER,
    });
    return data;
  }
}
