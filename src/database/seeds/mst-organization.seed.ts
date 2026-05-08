import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstOrganization } from '../../modules/organization/entities/mst_organization.entity';
import { MstOrganizationGroup } from '../../modules/organization/entities/mst_organization_group.entity';
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstOrganization, MstOrganizationGroup],
});

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstOrganization);
  const data = [
    { id: 1, code: 'OG001', description: 'Main ผลการดูแลผู้ป่วย', mst_organization_group_id: 1 },
    { id: 2, code: 'OG002', description: 'Sub ผลการดูแลผู้ป่วย1', mst_organization_group_id: 2 },
    { id: 3, code: 'OG003', description: 'Sub ผลการดูแลผู้ป่วย2', mst_organization_group_id: 2 },
    { id: 4, code: 'OG004', description: 'Sub ผลการดูแลผู้ป่วย3', mst_organization_group_id: 2 },

  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: { id: item.id },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }

  console.log('Seed mst_organization done');
  await AppDataSource.destroy();

}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
});