import 'dotenv/config';
import { DataSource } from 'typeorm';

import { MstServiceUnitGroup } from '../../modules/service-unit/entities/mst_serviceunit_group.entity';
import { MstServiceUnit } from '../../modules/service-unit/entities/mst_serviceunit.entity';
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstServiceUnit, MstServiceUnitGroup],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstServiceUnit);
  const data = [
    { id: 1, code: 'SU001', description: 'Med', service_unit_group_id: 1 },
    { id: 2, code: 'SU002', description: 'Surg', service_unit_group_id: 1 },
    { id: 3, code: 'SU003', description: 'Ortho', service_unit_group_id: 1 },
    { id: 4, code: 'SU004', description: 'Ped', service_unit_group_id: 1 },
    { id: 5, code: 'SU005', description: 'Eye', service_unit_group_id: 1 },
    { id: 6, code: 'SU006', description: 'ศูนย์สมองและหลอดเลือด', service_unit_group_id: 2 },
    { id: 7, code: 'SU007', description: 'ศูนย์หัวใจและหลอดเลือด', service_unit_group_id: 2 },
    { id: 8, code: 'SU008', description: 'ศูนย์เบาหวานและต่อมไร้ท่อ', service_unit_group_id: 2 },
    { id: 9, code: 'SU009', description: 'ศูนย์กระดูกและข้อ', service_unit_group_id: 2 },
    { id: 10, code: 'SU010', description: 'ศูนย์จักษุ', service_unit_group_id: 2 },
    { id: 11, code: 'SU011', description: 'ศูนย์ศัลยกรรม', service_unit_group_id: 2 },
    { id: 12, code: 'SU012', description: 'ฝ่ายคุณภาพ', service_unit_group_id: 3 },
    { id: 13, code: 'SU013', description: 'ENV', service_unit_group_id: 3 },
    { id: 14, code: 'SU014', description: 'LAB', service_unit_group_id: 3 },
    { id: 15, code: 'SU015', description: 'OR', service_unit_group_id: 3 },
    { id: 16, code: 'SU016', description: 'IT', service_unit_group_id: 3 },
    { id: 17, code: 'SU017', description: 'IC', service_unit_group_id: 3 },

  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed service_unit done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});