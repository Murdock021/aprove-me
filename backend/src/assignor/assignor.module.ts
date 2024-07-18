import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignor } from '@app/shareds/entities/mysql/assignor.entity'; // Importe a entidade correta
import { AssignorService } from './assignor.service';
import { AssignorRepository } from './assignor.repository'; // Importe o repositório
import { AssignorController } from './assignor.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignor, AssignorRepository]), // Inclua o repositório aqui
    // Outros módulos necessários
  ],
  controllers: [AssignorController],
  providers: [AssignorService, AssignorRepository], // Adicione o repositório aos provedores
})
export class AssignorModule {}
