import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from 'src/assignor/assignor.controller';
import { AssignorService } from 'src/assignor/assignor.service';
import { CreateAssignorDto, UpdateAssignorDto } from 'src/shareds';
import { Assignor } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

describe('AssignorController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
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

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new assignor', async () => {
      const dto: CreateAssignorDto = {
        document: '',
        email: '',
        phone: '',
        name: '',
      };
      const assignor = {} as Assignor;

      jest.spyOn(service, 'create').mockResolvedValue(assignor);

      expect(await controller.create(dto)).toBe(assignor);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of assignors', async () => {
      const assignors = [{}] as Assignor[];

      jest.spyOn(service, 'findAll').mockResolvedValue(assignors);

      expect(await controller.findAll()).toBe(assignors);
    });
  });

  describe('findOne', () => {
    it('should return a specific assignor by ID', async () => {
      const assignor = {} as Assignor;

      jest.spyOn(service, 'findOne').mockResolvedValue(assignor);

      expect(await controller.findOne('1')).toBe(assignor);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a specific assignor by ID', async () => {
      const dto: UpdateAssignorDto = {};
      const assignor = {} as Assignor;

      jest.spyOn(service, 'update').mockResolvedValue(assignor);

      expect(await controller.update('1', dto)).toBe(assignor);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a specific assignor by ID', async () => {
      const assignor = {} as Assignor;

      jest.spyOn(service, 'remove').mockResolvedValue(assignor);

      expect(await controller.remove('1')).toBe(assignor);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
