import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstUnit } from '../../modules/kpi-unit/entities/mst_kpi_unit.entity';
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstUnit],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstUnit);
  const data = [
    { id: 1, code: 'U001', description: 'อุบัติการณ์', scale_factor: '' },
    { id: 2, code: 'U002', description: 'อัตราต่อ', scale_factor: '' },
    { id: 3, code: 'U003', description: 'อัตราต่อ 100', scale_factor: '100' },
    { id: 4, code: 'U004', description: 'อัตราต่อ 1000', scale_factor: '1000' },
    { id: 5, code: 'U005', description: 'อัตราต่อ 10000', scale_factor: '10000' },
  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst_kpi_unit done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});