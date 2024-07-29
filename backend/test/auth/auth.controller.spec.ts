import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto, SignUpDto } from 'src/shareds';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up a new user', async () => {
      const dto: SignUpDto = {
        login: 'aprovame',
        password: 'aprovame',
      };
      const result = { id: 1, login: 'aprovame', password: 'aprovame' }; // Supondo que este seja o tipo esperado

      jest.spyOn(service, 'signUp').mockResolvedValue(result);

      expect(await controller.signUp(dto)).toBe(result);
      expect(service.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('signIn', () => {
    it('should sign in a user and return a token', async () => {
      const dto: SignInDto = {
        login: 'test',
        password: 'test',
      };
      const result = { id: 1, userId: 1, token: 'token-de-teste' };

      jest.spyOn(service, 'signIn').mockResolvedValue(result);

      expect(await controller.signIn(dto)).toBe(result);
      expect(service.signIn).toHaveBeenCalledWith(dto);
    });
  });
});
