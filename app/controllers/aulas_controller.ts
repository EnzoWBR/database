import Aulas from '#models/aula';
import type { HttpContext } from '@adonisjs/core/http';

export default class AulasController {
  async index({ response }: HttpContext) {
    try {
      const aulas = await Aulas.all();
      if (aulas.length) {
        response.safeStatus(200).json({
          aulas: aulas,
        });
      } else {
        response.safeStatus(200).json({
          message: `Não há aulas para listar!`,
        });
      }
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao consultar as aulas! ${error}`,
      });
    }
  }

  async store({ request, response }: HttpContext) {
    const { titulo, conteudo, arquivo } = request.only(['titulo', 'conteudo', 'arquivo']);

    try {
      const aulaAdd = await Aulas.create({ titulo, conteudo, arquivo });

      return response.safeStatus(201).json({
        message: `Aula ${aulaAdd.titulo}, criada com sucesso!`,
      });
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao incluir a aula! ${error}`,
      });
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const aulaF = await Aulas.find(params.id);

      if (aulaF !== null) {
        return response.safeStatus(200).json({
          aulaF: aulaF,
        });
      } else {
        return response.safeStatus(200).json({
          message: `Aula não localizada!`,
        });
      }
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao consultar a aula`,
      });
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const aula = await Aulas.findOrFail(params.id);

      const { titulo, conteudo, arquivo } = request.only(['titulo', 'conteudo', 'arquivo']);

      aula.merge({ titulo, conteudo, arquivo });

      await aula.save();

      return response.safeStatus(201).json({
        message: `Aula ${aula.titulo}, alterada com sucesso!`,
      });
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao alterar a aula! ${error}`,
      });
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const aula = await Aulas.findOrFail(params.id);
      await aula.delete();
      return response.safeStatus(200).json({
        message: `Aula ${aula.titulo} excluída com sucesso!`,
      });
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao excluir a aula! ${error}`,
      });
    }
  }
}