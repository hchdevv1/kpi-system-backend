import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import {MstSimple} from './mst_simple.entity';
@Entity({ name: 'mst_simple_group' })
export class MstSimpleGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;

  @OneToMany(() => MstSimple, (kpisimple) => kpisimple.kpisimplegroup)
  kpisimples?: MstSimple[];


}