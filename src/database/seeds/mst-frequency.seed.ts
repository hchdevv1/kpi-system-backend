import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstFrequency} from '../../modules/frequency/entities/mst_frequency.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstFrequency],
});

async function seed() {
 await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstFrequency);
 const data = [
    { id: 1, code: 'F001', description: 'Monthly (1 month)',interval_value:1 },
    { id: 2, code: 'F002', description: 'Quarterly (3 month)',interval_value:3},
    { id: 3, code: 'F003', description: 'Semiannual (6 month)',interval_value:6},
   
  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst_frequency done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});