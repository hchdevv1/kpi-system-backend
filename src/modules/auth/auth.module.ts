import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSystem } from '../users/entities/users.entity';
import { MstSystemRoles } from '../roles/entities/utils_system_roles.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserSystem,MstSystemRoles])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
