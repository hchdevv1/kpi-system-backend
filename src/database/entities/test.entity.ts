// src/database/entities/test.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('test_table')
export class TestEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;
}