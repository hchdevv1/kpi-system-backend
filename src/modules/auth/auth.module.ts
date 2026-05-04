import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSystem } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSystem])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
