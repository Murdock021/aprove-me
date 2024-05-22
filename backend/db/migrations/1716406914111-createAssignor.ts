import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssignor1716406914111 implements MigrationInterface {
  name = 'CreateAssignor1716406914111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`assignor\` (\`id\` varchar(36) NOT NULL, \`document\` varchar(30) NOT NULL, \`email\` varchar(140) NOT NULL, \`phone\` varchar(20) NOT NULL, \`name\` varchar(140) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`assignor\``);
  }
}

