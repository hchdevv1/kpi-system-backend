import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrequencyService } from './frequency.service';
import { FrequencyController } from './frequency.controller';
import { MstFrequency} from './entities/mst_frequency.entity';
import { CommonModule} from '../../common/common.module';

@Module({
    imports: [
            TypeOrmModule.forFeature([
              MstFrequency,
            ]),
           CommonModule
          ],
  controllers: [FrequencyController],
  providers: [FrequencyService],
})
export class FrequencyModule {}
