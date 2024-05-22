import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsUUID, IsNumber, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Receivable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column('float')
  @IsNumber()
  value: number;

  @Column('date')
  @IsDate()
  @Type(() => Date)
  emissionDate: Date;

  @Column('int')
  @IsInt()
  assignor: number;
}
