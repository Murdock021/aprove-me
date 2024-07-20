import { CreateAssignorDto } from 'src/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from 'src/shareds/dtos/assignor/update-assignor.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { AssignorRepository } from './assignor.repository';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async validateAssignorExists(id: number): Promise<void> {
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

  async findOne(id: number): Promise<Assignor | null> {
    await this.validateAssignorExists(id);
    return this.assignorRepository.findOne(id);
  }

  async update(
    id: number,
    updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    await this.validateAssignorExists(id);
    return this.assignorRepository.update(id, updateAssignorDto);
  }

  async remove(id: number): Promise<Assignor> {
    await this.validateAssignorExists(id);
    return await this.assignorRepository.remove(id);
  }
}
