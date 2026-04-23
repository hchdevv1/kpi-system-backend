import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { MstStrategy } from './mst_strategy.entity';

@Entity({ name: 'mst_strategy_group' })
export class MstStrategyGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  // ใช้ timezone Bangkok
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;

  // relation
  @OneToMany(() => MstStrategy, (strategy) => strategy.strategyGroup)
  strategies?: MstStrategy[];
}