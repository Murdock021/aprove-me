import { Test, TestingModule } from '@nestjs/testing';
import { AssignorRepository } from 'src/assignor/assignor.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssignorDto } from 'src/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from 'src/shareds/dtos/assignor/update-assignor.dto';
import { Assignor } from '@prisma/client';

describe('AssignorRepository', () => {
  let repository: AssignorRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorRepository, PrismaService],
    }).compile();

    repository = module.get<AssignorRepository>(AssignorRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a new assignor', async () => {
    const dto: CreateAssignorDto = {
      document: '',
      email: '',
      phone: '',
      name: '',
    };
    const assignor = {} as Assignor;

    jest.spyOn(prisma.assignor, 'create').mockResolvedValue(assignor);

    expect(await repository.create(dto)).toBe(assignor);
    expect(prisma.assignor.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should find all assignors', async () => {
    const assignors = [{}] as Assignor[];

    jest.spyOn(prisma.assignor, 'findMany').mockResolvedValue(assignors);

    expect(await repository.findAll()).toBe(assignors);
    expect(prisma.assignor.findMany).toHaveBeenCalled();
  });

  it('should find a specific assignor by ID', async () => {
    const assignor = {} as Assignor;

    jest.spyOn(prisma.assignor, 'findUnique').mockResolvedValue(assignor);

    expect(await repository.findOne(1)).toBe(assignor);
    expect(prisma.assignor.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a specific assignor by ID', async () => {
    const dto: UpdateAssignorDto = {};
    const assignor = {} as Assignor;

    jest.spyOn(prisma.assignor, 'update').mockResolvedValue(assignor);

    expect(await repository.update(1, dto)).toBe(assignor);
    expect(prisma.assignor.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
  });

  it('should remove a specific assignor by ID', async () => {
    const assignor = {} as Assignor;

    jest.spyOn(prisma.assignor, 'delete').mockResolvedValue(assignor);

    expect(await repository.remove(1)).toBe(assignor);
    expect(prisma.assignor.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
