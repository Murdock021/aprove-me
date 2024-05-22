import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [AssignorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
