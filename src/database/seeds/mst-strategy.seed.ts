import 'dotenv/config';
import { DataSource } from 'typeorm';
import {MstStrategyGroup} from '../../modules/strategy/entities/mst_strategy_group.entity';
import {MstStrategy} from '../../modules/strategy/entities/mst_strategy.entity';


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstStrategy,MstStrategyGroup],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstStrategy);
  const data = [
    { id: 1, code: 'ST001', description: 'พัฒนาศักยภาพการดูแลรักษา เพิ่มคุณภาพและสร้างความปลอดภัยระดับมาตรฐานสากล', mst_strategy_group_id: 1 },
    { id: 2, code: 'ST002', description: 'พัฒนาคุณภาพบริการสร้างความประทับใจสูงสุดพร้อมทั้งประสบการณ์ที่ดีของผู้รับบริการ', mst_strategy_group_id: 1 },
    { id: 3, code: 'ST003', description: 'พัฒนาศักยภาพการดูแลรักษา เพิ่มคุณภาพและสร้างความปลอดภัยระดับมาตรฐานสากล', mst_strategy_group_id: 2 },
    { id: 4, code: 'ST004', description: 'พัฒนาคุณภาพบริการสร้างความประทับใจสูงสุดพร้อมทั้งประสบการณ์ที่ดีของผู้รับบริการ', mst_strategy_group_id: 2 },
    { id: 5, code: 'ST005', description: 'สร้างระบบบริหารจัดการเพื่อการพัฒนาที่ยั่งยืน', mst_strategy_group_id: 2 },
    { id: 6, code: 'ST006', description: 'พัฒนาศักยภาพการดูแลรักษา เพิ่มคุณภาพและสร้างความปลอดภัยระดับมาตรฐานสากล', mst_strategy_group_id: 3 },
    
  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst_simple done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});