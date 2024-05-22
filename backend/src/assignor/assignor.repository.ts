import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignor } from '@app/shareds/entities/mysql/assignor.entity';
import { CreateAssignorDto } from '@app/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from '@app/shareds/dtos/assignor/update-assignor.dto';

@Injectable()
export class AssignorRepository {
  constructor(
    @InjectRepository(Assignor)
    private readonly assignorRepository: Repository<Assignor>,
  ) {}

  async create(data: CreateAssignorDto): Promise<Assignor> {
    const assignor = this.assignorRepository.create(data);
    return await this.assignorRepository.save(assignor);
  }

  async findAll(): Promise<Assignor[]> {
    return await this.assignorRepository.find();
  }

  async findOne(id: string): Promise<Assignor | undefined> {
    return await this.assignorRepository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateAssignorDto): Promise<Assignor> {
    await this.assignorRepository.update(id, data);
    return await this.assignorRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.assignorRepository.delete(id);
  }
}
