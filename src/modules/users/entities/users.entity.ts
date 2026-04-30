import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
@Entity({ name: 'users' })
export class UserSystem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  usercode!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'int' })
  usersystem_role_id!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  updated_at!: Date;
}