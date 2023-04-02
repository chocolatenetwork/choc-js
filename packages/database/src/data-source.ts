import { resolve } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';


const entities = resolve(__dirname, 'entities', '*.ts');
const migrations = resolve(__dirname, 'migrations', '*.ts');
// Tip: DataSource can also be a promise of DataSource.
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['host']!,
  port: Number(process.env['port']),
  username: process.env['username']!,
  password: process.env['password']!,
  database: process.env['database']!,
  entities: [entities],
  migrations: [migrations],
});
