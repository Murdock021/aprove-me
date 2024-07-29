import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto, SignInDto } from 'src/shareds';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findLogin: jest.fn(),
            createSession: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'testtoken'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'JWT_EXPIRATION_TIME':
                  return '3600s';
                case 'JWT_ISSUER':
                  return 'test-issuer';
                case 'JWT_AUDIENCE':
                  return 'test-audience';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up a new user', async () => {
      const dto: SignUpDto = { login: 'test', password: 'test' };
      const user = { id: 1, login: 'test', password: 'hashedpassword' };

      jest.spyOn(usersService, 'findLogin').mockResolvedValue(null);
      jest.spyOn(usersService, 'create').mockResolvedValue(user);

      expect(await authService.signUp(dto)).toBe(user);
      expect(usersService.findLogin).toHaveBeenCalledWith(dto.login);
      expect(usersService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw ConflictException if user already exists', async () => {
      const dto: SignUpDto = { login: 'test', password: 'test' };
      jest.spyOn(usersService, 'findLogin').mockResolvedValue({
        id: 1,
        login: 'test',
        password: 'hashedpassword',
      });

      await expect(authService.signUp(dto)).rejects.toThrow(
        new ConflictException('Login already in use!'),
      );
    });
  });

  describe('signIn', () => {
    it('should return a token for a valid user', async () => {
      const dto: SignInDto = { login: 'test', password: 'test' };
      const user = { id: 1, login: 'test', password: 'hashedpassword' };
      const session = { id: 1, userId: user.id, token: 'testtoken' };

      jest.spyOn(usersService, 'findLogin').mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(usersService, 'createSession').mockResolvedValue(session);
      jest
        .spyOn(authService, 'createToken')
        .mockReturnValue({ token: 'testtoken' });

      const result = await authService.signIn(dto);

      expect(result).toEqual(session);
      expect(usersService.findLogin).toHaveBeenCalledWith(dto.login);
      expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, user.password);
      expect(authService.createToken).toHaveBeenCalledWith(user);
      expect(usersService.createSession).toHaveBeenCalledWith(user.id, {
        token: 'testtoken',
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const dto: SignInDto = { login: 'test', password: 'wrongpassword' };
      const user = { id: 1, login: 'test', password: 'hashedpassword' };

      jest.spyOn(usersService, 'findLogin').mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.signIn(dto)).rejects.toThrow(
        new UnauthorizedException('Login or password not valid.'),
      );
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const dto: SignInDto = { login: 'nonexistent', password: 'test' };

      jest.spyOn(usersService, 'findLogin').mockResolvedValue(null);

      await expect(authService.signIn(dto)).rejects.toThrow(
        new UnauthorizedException('Login or password not valid.'),
      );
    });
  });
});
