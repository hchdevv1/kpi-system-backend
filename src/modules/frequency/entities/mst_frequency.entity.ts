import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';
@Entity({ name: 'mst_frequency' })
export class MstFrequency {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;
  @Column({ type: 'int' })
  interval_value!: number;
  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

}