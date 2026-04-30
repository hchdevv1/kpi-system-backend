import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiTopicService } from './kpi-topic.service';
import { KpiTopicController } from './kpi-topic.controller';
import {MstTopic} from './entities/mst_topic.entity';
import { CommonModule} from '../../common/common.module';
@Module({
  imports: [
            TypeOrmModule.forFeature([
              MstTopic,
             
            ]),
           CommonModule
          ],
  controllers: [KpiTopicController],
  providers: [KpiTopicService],
})
export class KpiTopicModule {}
