import Organizacao from '#models/organizacao'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizacoesController {
  public async index({ response }: HttpContext) {
    try {
      const organizacoes = await Organizacao.all();
      return response.status(200).json(organizacoes.length ? { organizacoes } : { message: 'Não há organizações a listar!' });
    } catch (error) {
      return response.status(400).json({ message: `Erro ao consultar as organizações! ${error.message}` });
    }
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nome', 'endereco', 'cep', 'telefone', 'email']);
    try {
      const organizacaoAdd = await Organizacao.create(data);
      return response.status(201).json({ message: `Organização ${organizacaoAdd.nome}, criada com sucesso!` });
    } catch (error) {
      return response.status(400).json({ message: `Erro ao incluir a organização! ${error.message}` });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const organizacao = await Organizacao.find(params.id);
      return organizacao ? response.status(200).json(organizacao) : response.status(404).json({ message: 'Organização não localizada!' });
    } catch (error) {
      return response.status(400).json({ message: `Erro ao consultar a organização! ${error.message}` });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const organizacao = await Organizacao.findOrFail(params.id);
      const data = request.only(['nome', 'endereco', 'cep', 'telefone', 'email']);
      organizacao.merge(data);
      await organizacao.save();
      return response.status(200).json({ message: `Organização ${organizacao.nome} alterada com sucesso!` });
    } catch (error) {
      return response.status(400).json({ message: `Erro ao alterar a organização! ${error.message}` });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const organizacao = await Organizacao.findOrFail(params.id);
      await organizacao.delete();
      return response.status(200).json({ message: `Organização excluída com sucesso!` });
    } catch (error) {
      return response.status(400).json({ message: `Erro ao excluir a organização! ${error.message}` });
    }
  }
}
