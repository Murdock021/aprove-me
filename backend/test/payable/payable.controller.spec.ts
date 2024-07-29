import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from 'src/payable/payable.controller';
import { PayableService } from 'src/payable/payable.service';
import { CreatePayableDto } from 'src/shareds/dtos/payable/create-payable.dto';
import { UpdatePayableDto } from 'src/shareds/dtos/payable/update-payable.dto';
import { Payable } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

describe('PayableController', () => {
  let controller: PayableController;
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: PayableService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payable', async () => {
      const dto: CreatePayableDto = {
        value: 0,
        emissionDate: undefined,
        assignorId: 0,
      };
      const payable = {} as Payable;

      jest.spyOn(service, 'create').mockResolvedValue(payable);

      expect(await controller.create(dto)).toBe(payable);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of payables', async () => {
      const payables = [{}] as Payable[];

      jest.spyOn(service, 'findAll').mockResolvedValue(payables);

      expect(await controller.findAll()).toBe(payables);
    });
  });

  describe('findOne', () => {
    it('should return a payable by ID', async () => {
      const payable = {} as Payable;

      jest.spyOn(service, 'findOne').mockResolvedValue(payable);

      expect(await controller.findOne('some-id')).toBe(payable);
      expect(service.findOne).toHaveBeenCalledWith('some-id');
    });
  });

  describe('update', () => {
    it('should update a payable by ID', async () => {
      const dto: UpdatePayableDto = {
        /* ...fields... */
      };
      const payable = {
        /* ...payable fields... */
      } as Payable;

      jest.spyOn(service, 'update').mockResolvedValue(payable);

      expect(await controller.update('some-id', dto)).toBe(payable);
      expect(service.update).toHaveBeenCalledWith('some-id', dto);
    });
  });

  describe('remove', () => {
    it('should remove a payable by ID', async () => {
      const payable = {
        /* ...payable fields... */
      } as Payable;

      jest.spyOn(service, 'remove').mockResolvedValue(payable);

      expect(await controller.remove('some-id')).toBe(payable);
      expect(service.remove).toHaveBeenCalledWith('some-id');
    });
  });
});
