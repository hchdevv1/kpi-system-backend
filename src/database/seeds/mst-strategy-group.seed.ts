import 'dotenv/config';
import { DataSource } from 'typeorm';

import { MstStrategyGroup } from '../../modules/strategy/entities/mst_strategy_group.entity';
import { MstStrategy} from '../../modules/strategy/entities/mst_strategy.entity';
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstStrategyGroup,MstStrategy],
});

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(MstStrategyGroup);

  const data = [
    { id: 1, code: 'STG001', description: 'Strategy' },
    { id: 2, code: 'STG002', description: 'Strategy Object' },
    { id: 3, code: 'STG003', description: 'Goal' },
  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log('Seed mst_strategy_group done');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed', err);
});