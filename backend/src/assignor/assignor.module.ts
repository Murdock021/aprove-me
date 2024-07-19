import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';

import { AssignorRepository } from './assignor.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AbortController],
  providers: [AssignorService, AssignorRepository, PrismaService],
})
export class AssignorModule {}
