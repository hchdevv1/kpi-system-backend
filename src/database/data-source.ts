import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstStrategy } from '../modules/strategy/entities/mst_strategy.entity';
import { MstStrategyGroup } from '../modules/strategy/entities/mst_strategy_group.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  //entities: ['src/database/entities/*.entity.ts'],
  //entities: ['src/**/*.entity{.ts,.js}'],
  entities: [MstStrategy, MstStrategyGroup],
  //migrations: ['src/migrations/*.ts'],
  migrations: ['src/database/migrations/*{.ts,.js}'],

  synchronize: false,
});