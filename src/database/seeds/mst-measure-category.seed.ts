import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstMeasure }  from '../../modules/measure-category/entities/mst_measure.entity'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstMeasure],
});

async function seed() {
 await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstMeasure);
 const data = [
    { id: 1, code: 'M001', description: 'ยุทธศาสตร์' },
    { id: 2, code: 'M002', description: 'องค์กร' },
    { id: 3, code: 'M003', description: 'KPI Simple' },
  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst_measure done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});