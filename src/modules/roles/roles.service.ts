import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstKpiRoles} from './entities/utils_kpi_roles.entity';
import {MstSystemRoles} from './entities/utils_system_roles.entity';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';

import {KpiRolesResponseDto} from './dto/kpi-roles-response.dto';
import {SystemRolesResponseDto} from './dto/system-roles-response.dto';
@Injectable()
export class RolesService {
 constructor(
    @InjectRepository(MstKpiRoles)
    private readonly kpiRolesRepo: Repository<MstKpiRoles>,
     @InjectRepository(MstSystemRoles)
    private readonly systemRolesRepo: Repository<MstSystemRoles>,
    private readonly dbRetryHelper: DbRetryHelper,
  
  ) { }

 async findSystemRoles(): Promise<SystemRolesResponseDto[]> {
  
    const groups = await this.systemRolesRepo.find({
      order: { id: 'ASC' },
    });
    console.log(groups)
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
      is_active: g.is_active
    }));
  }
 async findKpiRoles(): Promise<KpiRolesResponseDto[]> {
  
    const groups = await this.kpiRolesRepo.find({
      order: { id: 'ASC' },
    });
    console.log(groups)
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
      is_active: g.is_active
    }));
  }

  


}
