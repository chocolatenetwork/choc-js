import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Tip: DataSource can also be a promise of one.
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['host']!,
  port: Number(process.env['port']),
  username: process.env['username']!,
  password: process.env['password']!,
  database: process.env['database']!,
  entities: ['./entities/**.ts'],
  migrations: ['./migrations/**.ts'],
});
