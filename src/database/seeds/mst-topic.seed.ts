import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MstTopic} from '../../modules/kpi-topic/entities/mst_topic.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MstTopic],
});

async function seed() {
 await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(MstTopic);
 const data = [
    { id: 1, code: 'KPI001', description: 'อัตราการรายงานค่าวิกฤตใน 30 นาที',alias_code:'' },
    { id: 2, code: 'KPI002', description: 'อัตรา Re visit' ,alias_code:''},
    { id: 3, code: 'KPI003', description: 'อัตรา Re admit' ,alias_code:''},
    { id: 4, code: 'KPI004', description: 'อัตรา Medication Errors HAD ระดับ C Up IPD',alias_code:'' },
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