import 'dotenv/config';
import { DataSource } from 'typeorm';

import { MstSimpleGroup } from '../../modules/kpi-simple/entities/mst_simple_group.entity';
import { MstSimple } from '../../modules/kpi-simple/entities/mst_simple.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstSimpleGroup, MstSimple],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstSimpleGroup);
  const data = [
    { id: 1, code: 'KSG001', description: 'Patient' },
    { id: 2, code: 'KSG002', description: 'Personal' },
    { id: 3, code: 'KSG003', description: 'People' },

  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst_simple_group done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});