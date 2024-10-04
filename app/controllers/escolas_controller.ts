import Escola from '#models/escola'
import type { HttpContext } from '@adonisjs/core/http'

export default class EscolasController {
  public async index({ response }: HttpContext) {
    try {
      const escolas = await Escola.all()
      return response.status(200).json(escolas.length ? { escolas } : { message: 'Não há escolas a listar!' })
    } catch (error) {
      return response.status(400).json({ message: `Erro ao consultar as escolas! ${error.message}` })
    }
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'endereco', 'cep', 'telefone', 'email'])
    try {
      const escolaAdd = await Escola.create(data)
      return response.status(201).json({ message: `Escola ${escolaAdd.nome}, criada com sucesso!` })
    } catch (error) {
      return response.status(400).json({ message: `Erro ao incluir a escola! ${error.message}` })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const escola = await Escola.find(params.id)
      return escola ? response.status(200).json(escola) : response.status(404).json({ message: 'Escola não localizada!' })
    } catch (error) {
      return response.status(400).json({ message: `Erro ao consultar a escola! ${error.message}` })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const escola = await Escola.findOrFail(params.id)
      const data = request.only(['nome', 'endereco', 'cep', 'telefone', 'email'])
      escola.merge(data)
      await escola.save()
      return response.status(200).json({ message: `Escola ${escola.nome} alterada com sucesso!` })
    } catch (error) {
      return response.status(400).json({ message: `Erro ao alterar a escola! ${error.message}` })
    }
  }

  // Método para excluir uma escola
  public async destroy({ params, response }: HttpContext) {
    try {
      const escola = await Escola.findOrFail(params.id)
      await escola.delete()
      return response.status(200).json({ message: `Escola excluída com sucesso!` })
    } catch (error) {
      return response.status(400).json({ message: `Erro ao excluir a escola! ${error.message}` })
    }
  }
}
