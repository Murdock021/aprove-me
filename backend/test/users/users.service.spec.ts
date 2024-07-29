import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/shareds/dtos/users/create-user.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            createSession: jest.fn(),
            findLogin: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should create a new user with hashed password', async () => {
    const createUserDto: CreateUserDto = {
      login: 'test',
      password: 'password',
    };
    const hashedPassword = 'hashedPassword';
    const createdUser = { id: 1, login: 'test', password: hashedPassword };

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (repository.create as jest.Mock).mockResolvedValue(createdUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual({ id: 1, login: 'test' }); // password is removed
    expect(repository.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: hashedPassword,
    });
  });

  it('should create a new session for a user', async () => {
    const sessionData = { userId: 1, token: 'test-token' };
    (repository.createSession as jest.Mock).mockResolvedValue(sessionData);

    const result = await service.createSession(sessionData.userId, {
      token: sessionData.token,
    });
    expect(result).toEqual(sessionData);
    expect(repository.createSession).toHaveBeenCalledWith(
      sessionData.userId,
      sessionData.token,
    );
  });

  it('should find a user by login', async () => {
    const login = 'test';
    const user = { id: 1, login };
    (repository.findLogin as jest.Mock).mockResolvedValue(user);

    const result = await service.findLogin(login);
    expect(result).toEqual(user);
    expect(repository.findLogin).toHaveBeenCalledWith(login);
  });

  it('should find all users', async () => {
    const users = [{ id: 1, login: 'test' }];
    (repository.findAll as jest.Mock).mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const user = { id: 1, login: 'test' };
    (repository.findOne as jest.Mock).mockResolvedValue(user);

    const result = await service.findOne(1);
    expect(result).toEqual(user);
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });
});
