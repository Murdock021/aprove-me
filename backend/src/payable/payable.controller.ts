import { CreatePayableDto } from 'src/shareds/dtos/payable/create-payable.dto';
import { UpdatePayableDto } from 'src/shareds/dtos/payable/update-payable.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PayableService } from './payable.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Payable')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payable' })
  @ApiBody({ type: CreatePayableDto })
  @ApiResponse({
    status: 201,
    description: 'The payable has been successfully created.',
    type: CreatePayableDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createPayableDto: CreatePayableDto): Promise<Payable> {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all payables' })
  @ApiResponse({
    status: 200,
    description: 'List of all payables.',
    type: [CreatePayableDto],
  })
  @ApiResponse({ status: 404, description: 'No payables found.' })
  async findAll(): Promise<Payable[]> {
    return this.payableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific payable by ID' })
  @ApiResponse({
    status: 200,
    description: 'The payable with the specified ID.',
    type: CreatePayableDto,
  })
  @ApiResponse({ status: 404, description: 'Payable not found.' })
  async findOne(@Param('id') id: string): Promise<Payable> {
    return this.payableService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing payable by ID' })
  @ApiBody({ type: UpdatePayableDto })
  @ApiResponse({
    status: 200,
    description: 'The payable has been successfully updated.',
    type: CreatePayableDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Payable not found.' })
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ): Promise<Payable> {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payable by ID' })
  @ApiResponse({
    status: 200,
    description: 'The payable has been successfully deleted.',
    type: CreatePayableDto,
  })
  @ApiResponse({ status: 404, description: 'Payable not found.' })
  async remove(@Param('id') id: string): Promise<Payable> {
    return this.payableService.remove(id);
  }
}
