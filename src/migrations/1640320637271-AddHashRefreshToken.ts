import {MigrationInterface, QueryRunner} from "typeorm";

export class AddHashRefreshToken1640320637271 implements MigrationInterface {
    name = 'AddHashRefreshToken1640320637271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRt"`);
    }

}
