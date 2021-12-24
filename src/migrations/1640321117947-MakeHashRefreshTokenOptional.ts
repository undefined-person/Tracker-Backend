import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeHashRefreshTokenOptional1640321117947 implements MigrationInterface {
    name = 'MakeHashRefreshTokenOptional1640321117947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "hashedRt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "hashedRt" SET NOT NULL`);
    }

}
