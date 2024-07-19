import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorRepository } from './assignor.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AbortController],
  providers: [AssignorService, AssignorRepository, PrismaService],
})
export class AssignorModule {}
