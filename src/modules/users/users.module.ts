import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {UserSystem} from './entities/users.entity';
import { CommonModule } from '../../common/common.module';

@Module({

   imports: [
      TypeOrmModule.forFeature([
        UserSystem,
      ]),
      CommonModule,HttpModule
    ],
    
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
