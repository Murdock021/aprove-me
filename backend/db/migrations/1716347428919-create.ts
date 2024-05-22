import { MigrationInterface, QueryRunner } from 'typeorm';

export class Create1716347428919 implements MigrationInterface {
  name = 'Create1716347428919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`receivable\` (\`id\` varchar(36) NOT NULL, \`value\` float NOT NULL, \`emissionDate\` date NOT NULL, \`assignor\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`receivable\``);
  }
}

