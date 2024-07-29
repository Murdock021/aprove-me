import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from 'src/payable/payable.service';
import { PayableRepository } from 'src/payable/payable.repository';
import { CreatePayableDto } from 'src/shareds/dtos/payable/create-payable.dto';
import { UpdatePayableDto } from 'src/shareds/dtos/payable/update-payable.dto';
import { Payable } from '@prisma/client';

describe('PayableService', () => {
  let service: PayableService;
  let repository: PayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            doesAssignorExist: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
    repository = module.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payable', async () => {
      const dto: CreatePayableDto = {
        value: 0,
        emissionDate: undefined,
        assignorId: 0,
      };
      const payable = {
        /* ...payable fields... */
      } as Payable;

      jest.spyOn(repository, 'create').mockResolvedValue(payable);
      jest.spyOn(repository, 'doesAssignorExist').mockResolvedValue(true);

      expect(await service.create(dto)).toBe(payable);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });
});
