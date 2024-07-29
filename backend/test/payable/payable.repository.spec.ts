import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepository } from 'src/payable/payable.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePayableDto } from 'src/shareds/dtos/payable/create-payable.dto';
import { Payable } from '@prisma/client';

describe('PayableRepository', () => {
  let repository: PayableRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableRepository, PrismaService],
    }).compile();

    repository = module.get<PayableRepository>(PayableRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a new payable', async () => {
    const dto: CreatePayableDto = {
      value: 0,
      emissionDate: undefined,
      assignorId: 0,
    };
    const payable = {} as Payable;

    jest.spyOn(prisma.payable, 'create').mockResolvedValue(payable);

    expect(await repository.create(dto)).toBe(payable);
    expect(prisma.payable.create).toHaveBeenCalledWith({
      data: {
        value: dto.value,
        emissionDate: dto.emissionDate,
        assignor: {
          connect: { id: dto.assignorId },
        },
      },
    });
  });
});
