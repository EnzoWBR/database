import Aluno from '#models/aluno'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class AlunosController {

  async index({ response }: HttpContext) {
    try {
      const alunos = await Aluno.all()
      if (alunos.length) {
        response.safeStatus(200).json({
          alunos: alunos,
        })
      } else {
        response.safeStatus(200).json({
          message: `Não há alunos a listar!`,
        })
      }
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao consultar os alunos! ${error}`,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const { ...data } = request.all()

    try {
      const alunoAdd = await Aluno.create(data)

      // Envio de email após a criação do aluno com design estilizado
      try {
        await mail.send((message) => {
          message
            .from('ti2@wdobrasil.com.br')
            .to(alunoAdd.email)
            .subject('🎉 Cadastro realizado com sucesso! 🎉')
            .html(`
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="text-align: center; color: #007BFF;">🎓 Cadastro Realizado com Sucesso! 🎓</h2>
                <p style="font-size: 16px; color: #555;">Olá, <strong>${alunoAdd.nome}</strong>!</p>
                <p style="font-size: 16px; color: #555;">
                  Seu cadastro foi concluído com sucesso. Agora você pode acessar todos os nossos serviços e aproveitar ao máximo a nossa plataforma.
                </p>
                <hr style="border: none; border-top: 3px solid #007BFF;">
                <p style="text-align: center; font-size: 14px; color: #999;">
                  Obrigado por se registrar! Se você tiver alguma dúvida, entre em contato com o suporte.
                </p>
                <p style="text-align: center; font-size: 14px; color: #FF5722;">📞 Suporte: ti02.awf@gmail.com | (43) 99130-8099</p>
              </div>
            `)
        })
        console.log('Email enviado com sucesso!')
      } catch (error) {
        console.error('Erro ao enviar email:', error)
      }

      return response.safeStatus(201).json({
        message: `Aluno ${alunoAdd.nome}, criado com sucesso!`,
      })
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao incluir o aluno! ${error}`,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const alunoF = await Aluno.find(params.id)

      if (alunoF !== null) {
        return response.safeStatus(200).json({
          alunoF: alunoF,
        })
      } else {
        return response.safeStatus(200).json({
          message: `Aluno não localizado!`,
        })
      }
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao consultar o aluno`,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const alunoup = await Aluno.findOrFail(params.id)

      const { ...data } = request.only([
        'nome',
        'endereco',
        'telefone',
        'email',
        'escolaId',
        'createdAt',
        'updatedAt',
      ])

      alunoup.merge(data)

      const alunoModified = await alunoup.save()

      // Envio de email após a alteração do aluno com design estilizado
      try {
        await mail.send((message) => {
          message
            .from('ti2@wdobrasil.com.br')
            .to(alunoModified.email)
            .subject('🎉 Alteração no cadastro realizada com sucesso! 🎉')
            .html(`
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="text-align: center; color: #007BFF;">✏️ Alteração de Cadastro</h2>
                <p style="font-size: 16px; color: #555;">Olá, <strong>${alunoModified.nome}</strong>!</p>
                <p style="font-size: 16px; color: #555;">
                  Seu cadastro foi atualizado com sucesso. Por favor, confira os detalhes no sistema para garantir que tudo está correto.
                </p>
                <hr style="border: none; border-top: 3px solid #007BFF;">
                <p style="text-align: center; font-size: 14px; color: #999;">
                  Se você não solicitou essa alteração, entre em contato com o suporte imediatamente.
                </p>
                <p style="text-align: center; font-size: 14px; color: #FF5722;">📞 Suporte: ti02.awf@gmail.com | (43) 99130-8099</p>
              </div>
            `)
        })
        console.log('Email enviado com sucesso!')
      } catch (error) {
        console.error('Erro ao enviar email:', error)
      }

      return response.safeStatus(201).json({
        message: `Aluno ${alunoModified.nome}, alterado com sucesso!`,
      })
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao alterar o aluno! ${error}`,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const aluno = await Aluno.findOrFail(params.id)
      await aluno.delete()

      return response.safeStatus(200).json({
        message: `Aluno com ID ${params.id} excluído com sucesso!`,
      })
    } catch (error) {
      response.safeStatus(400).json({
        message: `Erro ao excluir o aluno! ${error}`,
      })
    }
  }
}
