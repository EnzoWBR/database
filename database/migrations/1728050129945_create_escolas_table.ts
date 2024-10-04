import { BaseSchema } from '@adonisjs/lucid/schema'

export default class EscolasSchema extends BaseSchema {
  protected tableName = 'escolas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
     

      table.string('nome').notNullable()
      table.string('endereco').notNullable()
      table.string('cep').notNullable()
      table.string('telefone').notNullable()
      table.string('email').notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
