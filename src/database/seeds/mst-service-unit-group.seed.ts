import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstServiceUnitGroup} from '../../modules/service-unit/entities/mst_serviceunit_group.entity';
import { MstServiceUnit } from '../../modules/service-unit/entities/mst_serviceunit.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstServiceUnitGroup,MstServiceUnit],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstServiceUnitGroup);
  const data = [
    { id: 1, code: 'SG001', description: 'PCT' },
    { id: 2, code: 'SG002', description: 'CoE' },
    { id: 3, code: 'SG003', description: 'Location' },

  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed mst_serviceunit_group done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});