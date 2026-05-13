/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import 'dotenv/config';
import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
//import { CodeGeneratorService } from '../../common/services/code-generator.service';
import { UserTrakcareResponseDto } from './dto/user-trakcare-response.dto';
import { CreateUserSystemDto } from './dto/create-user-system.dto';
import { UserSystemResponseDto } from './dto/create-user-system-response.dto';
import { PagingQueryDto } from './dto/pagination-topic.dto';

import { UserSystem } from './entities/users.entity';
import { UserListResponseDto } from './dto/userlist-response-pagination.dto';
import { UpdateUserSystemDto } from './dto/update-user-system.dto';
import { UserResponseDto } from './dto/user-system-response';
import { ListUsesrSystemResponseDto } from './dto/userlist-system-reponse.dto';
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
  async getUserSystemByCode(
    keyword: string,
  ): Promise<ListUsesrSystemResponseDto> {

    const groups = await this.userSystemRepo.find({
     where: [
      {
        usercode: ILike(`%${keyword}%`),
      },
      {
        description: ILike(`%${keyword}%`),
      },
    ],
      order: { id: 'ASC' },
    });

    const items: UserResponseDto[] = groups.map((g) => ({
      id: g.id,
      usercode: g.usercode,
      description: g.description,
      usersystem_role_id: g.usersystem_role_id,
      roleDescription: g.usersystem_role_id === 1 ? 'admin' : 'user',
      is_active: g.is_active,
    }));
    return { items };
  }
  async findAll(query: PagingQueryDto): Promise<UserListResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;
    const qb = this.userSystemRepo.createQueryBuilder('t');

    const [data, total] = await qb
      .orderBy('t.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();


    return {
      UserInfo: data.map((g) => ({
        id: g.id,
        usercode: g.usercode,
        description: g.description,
        usersystem_role_id: g.usersystem_role_id,
        roleDescription: g.usersystem_role_id === 1 ? 'admin' : 'user',
        is_active: g.is_active

      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async updateConditionOperator(
    xid: number, dto: UpdateUserSystemDto): Promise<UserResponseDto> {

    // 1. หา record
    const entity = await this.userSystemRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('condition-operator not found');
    }

    const { is_active, usersystem_role_id } = dto;

    if (usersystem_role_id !== undefined) {
      entity.usersystem_role_id = usersystem_role_id;
    }
    if (typeof is_active === 'boolean') {
      entity.is_active = is_active;
    }

    const saved = await this.userSystemRepo.save(entity);

    return {
      id: saved.id,
      usercode: saved.usercode,
      description: saved.description,
      usersystem_role_id: saved.usersystem_role_id,
      roleDescription: saved.usersystem_role_id === 1 ? 'admin' : 'user',
      is_active: saved.is_active
    };
  }

}
