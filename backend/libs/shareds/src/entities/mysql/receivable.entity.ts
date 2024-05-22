import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Receivable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  value: number;

  @Column('date')
  emissionDate: Date;

  @Column('int')
  assignor: number;
}
