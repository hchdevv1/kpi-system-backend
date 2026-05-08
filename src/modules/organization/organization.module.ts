import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';

import { MstOrganization} from './entities/mst_organization.entity';
import { MstOrganizationGroup} from './entities/mst_organization_group.entity'
import { CommonModule } from '../../common/common.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([
        MstOrganization,
        MstOrganizationGroup,
      ]),
      CommonModule
    ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
