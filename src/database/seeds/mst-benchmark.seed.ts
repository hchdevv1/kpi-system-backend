import 'dotenv/config';
import { DataSource } from 'typeorm';
import {MstBenchmark} from '../../modules/kpi-benchmark/entities/mst_benchmark.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstBenchmark],
});

async function seed() {
 await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstBenchmark);
 const data = [
    { id: 1, code: 'B001', description: 'National Average (ระดับประเทศ)' },
    { id: 2, code: 'B002', description: 'Hospital1' },
    { id: 3, code: 'B003', description: 'Hospital2' },
    { id: 4, code: 'B004', description: 'HA Standard' },
  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst_kpi_Benchmark done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});