import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/shareds/dtos/users/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a new user session', async () => {
    const sessionData = { userId: 1, token: 'test-token' };
    prisma.session.create = jest.fn().mockResolvedValue(sessionData);

    const result = await repository.createSession(
      sessionData.userId,
      sessionData.token,
    );
    expect(result).toEqual(sessionData);
    expect(prisma.session.create).toHaveBeenCalledWith({ data: sessionData });
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      login: 'test',
      password: 'password',
    };
    const createdUser = { id: 1, ...createUserDto };
    prisma.user.create = jest.fn().mockResolvedValue(createdUser);

    const result = await repository.create(createUserDto);
    expect(result).toEqual(createdUser);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserDto });
  });

  it('should find all users', async () => {
    const users = [{ id: 1, login: 'test' }];
    prisma.user.findMany = jest.fn().mockResolvedValue(users);

    const result = await repository.findAll();
    expect(result).toEqual(users);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });
});
