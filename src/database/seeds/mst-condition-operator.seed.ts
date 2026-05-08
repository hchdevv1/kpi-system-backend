import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstConditionOperator } from '../../modules/condition-operator/entities/mst_condition_operator.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstConditionOperator],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstConditionOperator);
  const data = [


    { id: 1, code: 'C001', description: 'มากกว่า', symbol: ' > ' },
    { id: 2, code: 'C002', description: 'มากกว่าเท่ากับ', symbol: ' ≥ ' },
    { id: 3, code: 'C003', description: 'เท่ากับ', symbol: ' = ' },
    { id: 4, code: 'C004', description: 'น้อยกว่า', symbol: ' < ' },
    { id: 5, code: 'C005', description: 'น้อยกว่าเท่ากับ', symbol: ' ≤ ' },

  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst-condition-operator done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});