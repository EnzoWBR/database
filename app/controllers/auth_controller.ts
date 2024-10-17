import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    async login({ request, response, params }: HttpContext) {

        //  const { ...dados } = request.only(['email', 'password'])

        const { email, password } = request.only(['email', 'password'])

        // console.log(dados)
        //response.safeStatus(200).json({ mensagem: "Dados enviados", dados: dados })
        const user = await User.verifyCredentials(email, password)

        if (!user) {
            return {
                message: 'Credenciais inválidas',
            }
        }

        return User.accessTokens.create(user, ['*'], {
            expiresIn: '1 days',
        })

    }
}