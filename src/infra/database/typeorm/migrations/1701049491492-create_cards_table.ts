import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardsTable1701049491492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'set_id',
            type: 'varchar',
            generationStrategy: 'uuid',
          },
          {
            name: 'face_of_id',
            type: 'varchar',
            generationStrategy: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'language',
            type: 'varchar',
          },
          {
            name: 'layout',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mana_cost',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'colors',
            type: 'varchar',
          },
          {
            name: 'formats',
            type: 'varchar',
          },
          {
            name: 'versions',
            type: 'varchar',
          },
          {
            name: 'image_uri',
            type: 'varchar',
          },
          {
            name: 'cmc',
            type: 'decimal',
            precision: 65,
            scale: 30,
            isNullable: true,
          },
          {
            name: 'type_line',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'loyalty',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'collection_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'frame',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'security_stamp',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'border_color',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'effect_text',
            type: 'longtext',
            isNullable: true,
          },
          {
            name: 'flavor_text',
            type: 'longtext',
            isNullable: true,
          },
          {
            name: 'rarity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_reserved',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'is_reprint',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'is_variant',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'is_found_in_booster',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'is_story_spotlight',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'cards_face_of_id_fkey',
            columnNames: ['face_of_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cards',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'cards_set_id_fkey',
            columnNames: ['set_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sets',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards', true);
  }
}
