import * as dotenv from 'dotenv';
dotenv.config();

const ormConfig = {
  type: 'mysql',
  host:
    process.env.DEVELOPMENT_ENVIRONMENT === 'production'
      ? process.env.DB_PROD_HOST
      : process.env.DB_HOST,
  url:
    process.env.DEVELOPMENT_ENVIRONMENT === 'production'
      ? process.env.DATABASE_URL
      : process.env.DATABASE_URL,
  port:
    process.env.DEVELOPMENT_ENVIRONMENT === 'production'
      ? process.env.DB_PROD_PORT
      : process.env.DB_PORT,
  username:
    process.env.DEVELOPMENT_ENVIRONMENT === 'production'
      ? process.env.DB_PROD_USER
      : process.env.DB_USER,
  password:
    process.env.DEVELOPMENT_ENVIRONMENT === 'production'
      ? process.env.DB_PROD_PASSWORD
      : process.env.DB_PASSWORD,
  database:
    process.env.DEVELOPMENT_ENVIRONMENT === 'production'
      ? process.env.DB_PROD_DATABASE
      : process.env.DB_DATABASE,
  migrationsRun: false,
  synchronize: false,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  extra: {
    ssl:
      process.env.ENVIRONMENT === 'production'
        ? {
            rejectUnauthorized: false,
          }
        : undefined,
  },
};
export default ormConfig;
