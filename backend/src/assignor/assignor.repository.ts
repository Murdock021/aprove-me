import { CreateAssignorDto } from 'src/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from 'src/shareds/dtos/assignor/update-assignor.dto';
import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssignorRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAssignorDto): Promise<Assignor> {
    return this.prisma.assignor.create({ data });
  }

  findAll(): Promise<Assignor[]> {
    return this.prisma.assignor.findMany();
  }

  async findOne(id: number): Promise<Assignor | null> {
    return this.prisma.assignor.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAssignorDto): Promise<Assignor> {
    return this.prisma.assignor.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Assignor> {
    return this.prisma.assignor.delete({
      where: { id },
    });
  }
}
