import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenchmarkService } from './benchmark.service';
import { BenchmarkController } from './benchmark.controller';
import { MstBenchmark} from './entities/mst_benchmark.entity';
import { CommonModule} from '../../common/common.module';

@Module({
   imports: [
          TypeOrmModule.forFeature([
            MstBenchmark,
           
          ]),
         CommonModule
        ],
  controllers: [BenchmarkController],
  providers: [BenchmarkService],
})
export class BenchmarkModule {}
