import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from 'src/assignor/assignor.service';
import { AssignorRepository } from 'src/assignor/assignor.repository';
import { CreateAssignorDto } from 'src/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from 'src/shareds/dtos/assignor/update-assignor.dto';
import { NotFoundException } from '@nestjs/common';
import { Assignor } from '@prisma/client';

describe('AssignorService', () => {
  let service: AssignorService;
  let repository: AssignorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: AssignorRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    repository = module.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(repository, 'create').mockResolvedValue(assignor);

      expect(await service.create(dto)).toBe(assignor);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of assignors', async () => {
      const assignors = [{}] as Assignor[];

      jest.spyOn(repository, 'findAll').mockResolvedValue(assignors);

      expect(await service.findAll()).toBe(assignors);
    });
  });

  describe('findOne', () => {
    it('should return a specific assignor by ID', async () => {
      const assignor = {
        /* dados do assignor */
      } as Assignor;

      jest.spyOn(repository, 'findOne').mockResolvedValue(assignor);

      expect(await service.findOne(1)).toBe(assignor);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if assignor is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a specific assignor by ID', async () => {
      const dto: UpdateAssignorDto = {};
      const assignor = {} as Assignor;

      jest.spyOn(repository, 'update').mockResolvedValue(assignor);
      jest.spyOn(service, 'validateAssignorExists').mockResolvedValue();

      expect(await service.update(1, dto)).toBe(assignor);
      expect(service.validateAssignorExists).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a specific assignor by ID', async () => {
      const assignor = {} as Assignor;

      jest.spyOn(repository, 'remove').mockResolvedValue(assignor);
      jest.spyOn(service, 'validateAssignorExists').mockResolvedValue();

      expect(await service.remove(1)).toBe(assignor);
      expect(service.validateAssignorExists).toHaveBeenCalledWith(1);
      expect(repository.remove).toHaveBeenCalledWith(1);
    });
  });
});
