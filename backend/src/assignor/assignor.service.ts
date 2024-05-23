import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from '@app/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from '@app/shareds/dtos/assignor/update-assignor.dto';
import { Assignor } from '@app/shareds/entities/mysql/assignor.entity'; // Importe a entidade correta

@Injectable()
export class AssignorService {
  private assignors: Assignor[] = [];

  create(createAssignorDto: CreateAssignorDto): string {
    const newAssignor: Assignor = {
      id: this.assignors.length + 1 + '',
      document: createAssignorDto.document,
      email: createAssignorDto.email,
      phone: createAssignorDto.phone,
      name: createAssignorDto.name,
    };
    this.assignors.push(newAssignor);
    return 'Assignor criado com sucesso';
  }

  findAll(): Assignor[] {
    return this.assignors;
  }

  findOne(id: string): Assignor {
    const assignor = this.assignors.find((a) => a.id === id);
    if (!assignor) {
      throw new Error('Assignor não encontrado');
    }
    return assignor;
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto): string {
    const assignorIndex = this.assignors.findIndex((a) => a.id === id);
    if (assignorIndex !== -1) {
      const updatedAssignor = {
        ...this.assignors[assignorIndex],
        ...updateAssignorDto,
      };
      this.assignors[assignorIndex] = updatedAssignor;
      return 'Assignor atualizado com sucesso';
    }
    return 'Assignor não encontrado';
  }

  remove(id: string): string {
    const assignorIndex = this.assignors.findIndex((a) => a.id === id);
    if (assignorIndex !== -1) {
      this.assignors.splice(assignorIndex, 1);
      return 'Assignor removido com sucesso';
    }
    return 'Assignor não encontrado';
  }
}
