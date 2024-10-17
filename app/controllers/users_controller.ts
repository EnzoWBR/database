 import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async store({ request, response }: HttpContext) {
        const { fullName, email, password } = request.only(['fullName', 'email', 'password']);
    
        try {
          const UserAdd = await User.create({ fullName, email, password });
    
          return response.safeStatus(201).json({
            message: `User ${UserAdd.email}, criada com sucesso!`,
          });
        } catch (error) {
          response.safeStatus(400).json({
            message: `Erro ao incluir a Login! ${error}`,
          });
        }
      }
}