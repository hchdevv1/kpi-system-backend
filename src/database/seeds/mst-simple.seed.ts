import 'dotenv/config';
import { DataSource } from 'typeorm';

import {MstSimpleGroup} from '../../modules/kpi-simple/entities/mst_simple_group.entity';
import {MstSimple} from '../../modules/kpi-simple/entities/mst_simple.entity'
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstSimple,MstSimpleGroup],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstSimple);
  const data = [
    { id: 1, code: 'KS001', description: 'Safety surgery', simple_group_id: 1 },
    { id: 2, code: 'KS002', description: 'Infection Prevention and Control', simple_group_id: 1 },
    { id: 3, code: 'KS003', description: 'Medication and blood safety', simple_group_id: 1 },
    { id: 4, code: 'KS004', description: 'Patient care process', simple_group_id: 1 },
    { id: 5, code: 'KS005', description: 'Line, Tube catheter', simple_group_id: 1 },
    { id: 6, code: 'KS006', description: 'Safety surgery', simple_group_id: 2 },
    { id: 7, code: 'KS007', description: 'Infection Prevention and Control', simple_group_id: 2 },
    { id: 8, code: 'KS008', description: 'Medication and blood safety', simple_group_id: 2 },
    { id: 9, code: 'KS009', description: 'Safety surgery', simple_group_id: 3 },
    { id: 10, code: 'KS010', description: 'Infection Prevention and Control', simple_group_id: 3 },
    { id: 11, code: 'KS011', description: 'Medication and blood safety', simple_group_id: 3 },
    { id: 12, code: 'KS012', description: 'Patient care process', simple_group_id: 3 },


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