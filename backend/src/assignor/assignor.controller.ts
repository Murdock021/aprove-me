import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { Assignor } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateAssignorDto, UpdateAssignorDto } from 'src/shareds';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Assignor')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('/integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assignor' })
  @ApiBody({ type: CreateAssignorDto })
  @ApiResponse({
    status: 201,
    description: 'The assignor has been successfully created.',
    type: CreateAssignorDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createAssignorDto: CreateAssignorDto): Promise<Assignor> {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all assignors' })
  @ApiResponse({
    status: 200,
    description: 'List of all assignors.',
    type: [CreateAssignorDto],
  })
  @ApiResponse({ status: 404, description: 'No assignors found.' })
  findAll(): Promise<Assignor[]> {
    return this.assignorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific assignor by ID' })
  @ApiResponse({
    status: 200,
    description: 'The assignor with the specified ID.',
    type: CreateAssignorDto,
  })
  @ApiResponse({ status: 404, description: 'Assignor not found.' })
  findOne(@Param('id') id: string): Promise<Assignor> {
    return this.assignorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing assignor by ID' })
  @ApiBody({ type: UpdateAssignorDto })
  @ApiResponse({
    status: 200,
    description: 'The assignor has been successfully updated.',
    type: CreateAssignorDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Assignor not found.' })
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ): Promise<Assignor> {
    return this.assignorService.update(+id, updateAssignorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assignor by ID' })
  @ApiResponse({
    status: 200,
    description: 'The assignor has been successfully deleted.',
    type: CreateAssignorDto,
  })
  @ApiResponse({ status: 404, description: 'Assignor not found.' })
  remove(@Param('id') id: string): Promise<Assignor> {
    return this.assignorService.remove(+id);
  }
}
