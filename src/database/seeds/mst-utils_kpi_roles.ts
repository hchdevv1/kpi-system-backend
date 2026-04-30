import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstKpiRoles} from '../../modules/roles/entities/utils_kpi_roles.entity';


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstKpiRoles],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstKpiRoles);
  const data = [
    { id: 1, code: '1', description: 'Owner', },
    { id: 2, code: '2', description: 'Contributor', },
    { id: 3, code: '3', description: 'Viewer', },

  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log(' Seed utils_kpi_roles done');
  await AppDataSource.destroy();

}


seed().catch((err) => {
  console.error('Seed failed', err);
});