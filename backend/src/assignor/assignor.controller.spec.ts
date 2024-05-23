import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from '@app/shareds/dtos/assignor/create-assignor.dto';

describe('AssignorService', () => {
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorService],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an assignor', () => {
    const createAssignorDto: CreateAssignorDto = {
      document: '123456789',
      email: 'assignor@example.com',
      phone: '1234567890',
      name: 'Assignor Name',
    };
    expect(service.create(createAssignorDto)).toBe(
      'Assignor criado com sucesso',
    );
  });

  it('should return all assignors', () => {
    expect(service.findAll()).toEqual([]);
  });

  // Adicione outros testes conforme necessário
});
