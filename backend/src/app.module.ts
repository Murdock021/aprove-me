import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignorModule } from './assignor/assignor.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlAppTypeOrmAsyncConfig } from '@app/shareds/config/database.config';
import { AssignorRepository } from './assignor/assignor.repository';
import { Assignor } from '@app/shareds/entities/mysql/assignor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(mysqlAppTypeOrmAsyncConfig),
    AssignorModule,
    TypeOrmModule.forFeature([Assignor]),
  ],
  controllers: [AppController],
  providers: [AppService, AssignorRepository],
})
export class AppModule {}
