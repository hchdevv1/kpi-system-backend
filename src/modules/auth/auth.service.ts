/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import 'dotenv/config';
import { LoginDto } from './dto/login.dto';
import { UserSystem } from '../users/entities/users.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSystem)
    private readonly userRepo: Repository<UserSystem>,
  ) { }
  async login(dto: LoginDto) {
    const { usercode, password } = dto;


    const TrakcareURL = process.env.TRAKCARE_URL
    const APIPath = process.env.TRAKCARE_PATH_HCHIntraAPI
    const url = `${TrakcareURL}${APIPath}/LogonByTrakcare/${usercode}/${password}`;
    // const url = `http://10.10.17.91:52773/HCHIntraAPI/LogonByTrakcare/${usercode}/${password}`;

    let response;

    try {
      response = await axios.get(url);
    } catch (error) {
      throw new UnauthorizedException('Cannot connect to Trakcare');
    }

    const logon = response.data?.LogOnInfo;

    if (!logon) {
      throw new UnauthorizedException('Invalid response from Trakcare');
    }

    if (logon.LogOnCode !== 2) {
      throw new UnauthorizedException(logon.LogOnStatus);
    }

    const user = await this.userRepo.findOne({
      where: { usercode: logon.LogOnUserID },
    });

    if (!user) {
      throw new UnauthorizedException('User not found in system');
    }

    return {
      userId: user.id,
      usercode: user.usercode,
      userName: logon.LogOnUserName,
      usersystem_role_id: user.usersystem_role_id
    };
  }
}

