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
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #007BFF; border-radius: 10px 10px 0 0; padding: 20px; text-align: center;">
              <h2 style="margin: 0; color: white; font-size: 24px; font-weight: bold;">🎓 Cadastro Realizado com Sucesso! 🎓</h2>
            </div>
            <div style="padding: 20px; color: #555;">
              <p style="font-size: 16px;">Olá, <strong style="color: #007BFF;">${alunoAdd.nome}</strong>!</p>
              <p style="font-size: 16px;">
                Seu cadastro foi concluído com sucesso! Agora você pode acessar todos os nossos serviços e aproveitar ao máximo a nossa plataforma.
              </p>
              <hr style="border: none; border-top: 2px solid #007BFF; margin: 20px 0;">
              <p style="font-size: 14px; text-align: center; color: #999;">
                Obrigado por se registrar! Se você tiver alguma dúvida, entre em contato com o suporte.
              </p>
              <p style="font-size: 14px; text-align: center; color: #FF5722; font-weight: bold;">📞 Suporte: ti02.awf@gmail.com | (43) 99130-8099</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:ti02.awf@gmail.com" style="background-color: #007BFF; color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-size: 16px; font-weight: bold; transition: background-color 0.3s;">
                Contatar Suporte
              </a>
            </div>
          </div>`)
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
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #007BFF; border-radius: 10px 10px 0 0; padding: 20px; text-align: center;">
              <h2 style="margin: 0; color: white; font-size: 24px; font-weight: bold;">✏️ Alteração de Cadastro</h2>
            </div>
            <div style="padding: 20px; color: #555;">
              <p style="font-size: 16px;">Olá, <strong style="color: #007BFF;">${alunoModified.nome}</strong>!</p>
              <p style="font-size: 16px;">
                Seu cadastro foi atualizado com sucesso. Por favor, confira os detalhes no sistema para garantir que tudo está correto.
              </p>
              <hr style="border: none; border-top: 2px solid #007BFF; margin: 20px 0;">
              <p style="font-size: 14px; text-align: center; color: #999;">
                Se você não solicitou essa alteração, entre em contato com o suporte imediatamente.
              </p>
              <p style="font-size: 14px; text-align: center; color: #FF5722; font-weight: bold;">📞 Suporte: ti02.awf@gmail.com | (43) 99130-8099</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:ti02.awf@gmail.com" style="background-color: #007BFF; color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; font-size: 16px; font-weight: bold; transition: background-color 0.3s;">
                Contatar Suporte
              </a>
            </div>
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
