import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from '@app/shareds/dtos/assignor/create-assignor.dto';
import { UpdateAssignorDto } from '@app/shareds/dtos/assignor/update-assignor.dto';
import { Assignor } from '@app/shareds/entities/mysql/assignor.entity';

@Controller('assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  create(@Body() createAssignorDto: CreateAssignorDto): string {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  findAll(): Assignor[] {
    return this.assignorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Assignor {
    return this.assignorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ): string {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.assignorService.remove(id);
  }
}
