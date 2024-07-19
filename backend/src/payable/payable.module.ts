import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';

import { PayableRepository } from './payable.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PayableController } from './payable.controller';

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [PayableService, PayableRepository, PrismaService],
})
export class PayableModule {}
