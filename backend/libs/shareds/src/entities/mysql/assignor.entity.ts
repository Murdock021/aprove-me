import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assignor')
export class Assignor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  document: string;

  @Column({ type: 'varchar', length: 140 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 140 })
  name: string;
}
