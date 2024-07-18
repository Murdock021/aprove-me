import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Assignor } from '../entities/mysql/assignor.entity';
import { Receivable } from '../entities';

export const MysqlAppConnection = 'MysqlAppConnection';

export const mysqlAppTypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  name: MysqlAppConnection,
  useFactory: (config: ConfigService): TypeOrmModuleOptions => {
    const environment =
      config.get('DEVELOPMENT_ENVIRONMENT') === 'production' ? true : false;
    const options = {
      type: 'mysql',
      host: environment ? process.env.DB_PROD_HOST : process.env.DB_HOST,
      url: environment
        ? config.get('DATABASE_URL')
        : config.get('DATABASE_URL'),
      port: environment ? config.get('DB_PROD_PORT') : config.get('DB_PORT'),
      username: environment
        ? config.get('DB_PROD_USER')
        : config.get('DB_USER'),
      password: environment
        ? config.get('DB_PROD_PASSWORD')
        : config.get('DB_PASSWORD'),
      database: environment
        ? config.get('DB_PROD_DATABASE')
        : config.get('DB_DATABASE'),
      migrationsRun: false,
      synchronize: false,
      autoLoadEntities: true,
      // logging: ['query'],
      entities: [Assignor, Receivable],
      migrations: ['dist/db/migrations/*.js'],
    } as TypeOrmModuleOptions;

    return options;
  },
};
