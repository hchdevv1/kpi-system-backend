import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureCategoryService } from './measure-category.service';
import { MeasureCategoryController } from './measure-category.controller';
import { MstMeasure} from './entities/mst_measure.entity';
import {CommonModule} from '../../common/common.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          MstMeasure,
         
        ]),
       CommonModule
      ],
  controllers: [MeasureCategoryController],
  providers: [MeasureCategoryService],
})
export class MeasureCategoryModule {}
