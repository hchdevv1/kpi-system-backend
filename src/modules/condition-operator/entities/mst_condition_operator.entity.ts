import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';
@Entity({ name: 'mst_condition_operator' })
export class MstConditionOperator {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

   @Column({ type: 'varchar', length: 255 , nullable: true})
  symbol?: string | null;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

}