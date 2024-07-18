import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignorDto } from '@app/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from '@app/shareds/dtos/assignor/update-assignor.dto';
import { Assignor } from '@app/shareds/entities/mysql/assignor.entity';
import { MysqlAppConnection } from '@app/shareds/config/database.config';

@Injectable()
export class AssignorService {
  constructor(
    @InjectRepository(Assignor, MysqlAppConnection)
    private readonly assignorRepository: Repository<Assignor>,
  ) {}

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    const assignor = this.assignorRepository.create(createAssignorDto);
    return this.assignorRepository.save(assignor);
  }

  async findAll(): Promise<Assignor[]> {
    return this.assignorRepository.find();
  }

  async findOne(id: string): Promise<Assignor | undefined> {
    const assignor = this.assignorRepository.findOne({ where: { id } });
    if (!assignor) {
      throw new NotFoundException(`Cost with ID "${id}" not found`);
    }
    return assignor;
  }

  async update(
    id: string,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    const assignor = await this.findOne(id);
    Object.assign(assignor, updateAssignorDto);
    return this.assignorRepository.save(assignor);
  }

  async remove(id: string): Promise<void> {
    const assignor = await this.findOne(id);
    await this.assignorRepository.remove(assignor);
  }
}
