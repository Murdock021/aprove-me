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
} from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PayableService } from './payable.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto): Promise<Payable> {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  async findAll(): Promise<Payable[]> {
    return this.payableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payable> {
    return this.payableService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ): Promise<Payable> {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Payable> {
    return this.payableService.remove(id);
  }
}
