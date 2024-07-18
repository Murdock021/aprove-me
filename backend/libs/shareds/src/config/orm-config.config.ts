import * as dotenv from 'dotenv';
dotenv.config();

const ormConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false, // ou true se quiser sincronizar automaticamente
  migrationsRun: false,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  extra: {
    ssl:
      process.env.ENVIRONMENT === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  },
};

export default ormConfig;
