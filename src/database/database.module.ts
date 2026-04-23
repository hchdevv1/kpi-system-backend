import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MstStrategy } from '../modules/strategy/entities/mst_strategy.entity';
import { MstStrategyGroup } from '../modules/strategy/entities/mst_strategy_group.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [MstStrategy, MstStrategyGroup],
        //entities: [__dirname + '/entities/*.entity{.ts,.js}'],

        synchronize: false, // ✅ ตาม requirement
        logging: true,

        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsRun: false,
      }),
    }),
  ],
})
export class DatabaseModule {}