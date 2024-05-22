import { Injectable, NotFoundException } from '@nestjs/common';
import { AssignorRepository } from './assignor.repository';
import { Assignor } from '@app/shareds/entities/mysql/assignor.entity';
import { CreateAssignorDto } from '@app/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from '@app/shareds/dtos/assignor/update-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async validateAssignorExists(id: string): Promise<void> {
    const assignor = await this.assignorRepository.findOne(id);

    if (!assignor) {
      throw new NotFoundException(`Assignor with id ${id} not found.`);
    }
  }

  async create(createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    return this.assignorRepository.create(createAssignorDto);
  }

  async findAll(): Promise<Assignor[]> {
    return this.assignorRepository.findAll();
  }

  async findOne(id: string): Promise<Assignor | null> {
    await this.validateAssignorExists(id);
    return this.assignorRepository.findOne(id);
  }

  async update(
    id: string,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    await this.validateAssignorExists(id);
    return this.assignorRepository.update(id, updateAssignorDto);
  }

  async remove(id: string): Promise<void> {
    await this.validateAssignorExists(id);
    await this.assignorRepository.remove(id);
  }
}
