import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Aula extends BaseModel {
  public static table = 'aulas'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare conteudo: string

  @column()
  declare arquivo: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}