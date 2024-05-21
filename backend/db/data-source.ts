import * as dotenv from 'dotenv';
dotenv.config();

import { DataSourceOptions, DataSource } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'prime',
  password: process.env.DB_PASSWORD || 'prime@123',
  database: process.env.DB_DATABASE || 'prime',
  migrations: ['**/migrations/*.ts'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
