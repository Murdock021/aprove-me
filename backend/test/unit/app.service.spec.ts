import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from 'src/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "It is working correctly"', () => {
    expect(service.getHealth()).toBe('It is working correctly');
  });
});
