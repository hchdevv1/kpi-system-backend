/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import 'dotenv/config';
import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
//import { CodeGeneratorService } from '../../common/services/code-generator.service';
import { UserTrakcareResponseDto } from './dto/user-trakcare-response.dto';
import { CreateUserSystemDto } from './dto/create-user-system.dto';
import { UserSystemResponseDto } from './dto/create-user-system-response.dto';

import { UserSystem } from './entities/users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserSystem)
    private readonly userSystemRepo: Repository<UserSystem>,
    private readonly dbRetryHelper: DbRetryHelper,
    // private readonly codeGenerator: CodeGeneratorService,
    private readonly httpService: HttpService
  ) { }

  async createUserSysytem(dto: CreateUserSystemDto): Promise<UserSystemResponseDto> {
    const { usercode, description, usersystem_role_id, is_active } = dto;
    console.log('dto')

    return this.dbRetryHelper.onUnique(async () => {
      const existing = await this.userSystemRepo.findOne({
        where: { usercode },
      });
      if (existing) {
        throw new BadRequestException('User already exists');
      }
      const entity = this.userSystemRepo.create({
        usercode,
        description,
        usersystem_role_id,
        is_active: is_active ?? true,
      });

      const saved = await this.userSystemRepo.save(entity);

      return {
        usercode: saved.usercode,
        description: saved.description,
        usersystem_role_id: saved.usersystem_role_id,
        is_active: saved.is_active,
      };
    });
  }

  async getUserByCode(code: string): Promise<UserTrakcareResponseDto> {
    const TrakcareURL = process.env.TRAKCARE_URL
    const APIPath = process.env.TRAKCARE_PATH_HCHIntraAPI

    const url = `${TrakcareURL}${APIPath}/ListUserTrakcareByCode/${code}`;
    const response = await firstValueFrom(
      this.httpService.get(url),
    );

    const data = response.data;

    return {
      UserInfo: (data?.UserInfo || []).map((item: any) => ({
        RowID: Number(item.RowID),
        UserCode: item.UserCode,
        UserName: item.UserName,
      })),
    };
  }

}
