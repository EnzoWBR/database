import AlunosController from '#controllers/alunos_controller'
import AulasController from '#controllers/aulas_controller'
import AuthController from '#controllers/auth_controller'
import EscolasController from '#controllers/escolas_controller'
import OrganizacaoController from '#controllers/organizacao_controller'
import UsersController from '#controllers/users_controller'

import router from '@adonisjs/core/services/router'
import AuthMiddleware from '#middleware/auth_middleware' // Importa a classe AuthMiddleware

// Instancie o middleware
const authMiddleware = new AuthMiddleware();

router.get('/', async () => {
  return {
    hello: 'Bem vindo ao BANCO DE DADOS',
  }
})

// Rotas de Alunos (Protegidas com middleware 'auth')
router.get('alunos', [AlunosController, 'index']).use(authMiddleware.handle.bind(authMiddleware))
router.post('alunos', [AlunosController, 'store']).use(authMiddleware.handle.bind(authMiddleware))
router.get('alunos/:id', [AlunosController, 'show']).use(authMiddleware.handle.bind(authMiddleware))
router.put('alunos/:id', [AlunosController, 'update']).use(authMiddleware.handle.bind(authMiddleware))
router.delete('alunos/:id', [AlunosController, 'destroy']).use(authMiddleware.handle.bind(authMiddleware))

// Rotas de Aulas (Protegidas com middleware 'auth')
router.get('aulas', [AulasController, 'index']).use(authMiddleware.handle.bind(authMiddleware))
router.post('aulas', [AulasController, 'store']).use(authMiddleware.handle.bind(authMiddleware))
router.get('aulas/:id', [AulasController, 'show']).use(authMiddleware.handle.bind(authMiddleware))
router.put('aulas/:id', [AulasController, 'update']).use(authMiddleware.handle.bind(authMiddleware))
router.delete('aulas/:id', [AulasController, 'destroy']).use(authMiddleware.handle.bind(authMiddleware))

// Rotas de Escolas (Protegidas com middleware 'auth')
router.get('escolas', [EscolasController, 'index']).use(authMiddleware.handle.bind(authMiddleware))
router.post('escolas', [EscolasController, 'store']).use(authMiddleware.handle.bind(authMiddleware))
router.get('escolas/:id', [EscolasController, 'show']).use(authMiddleware.handle.bind(authMiddleware))
router.put('escolas/:id', [EscolasController, 'update']).use(authMiddleware.handle.bind(authMiddleware))
router.delete('escolas/:id', [EscolasController, 'destroy']).use(authMiddleware.handle.bind(authMiddleware))

// Rotas de Organização (Protegidas com middleware 'auth')
router.get('organizacao', [OrganizacaoController, 'index']).use(authMiddleware.handle.bind(authMiddleware))
router.post('organizacao', [OrganizacaoController, 'store']).use(authMiddleware.handle.bind(authMiddleware))
router.get('organizacao/:id', [OrganizacaoController, 'show']).use(authMiddleware.handle.bind(authMiddleware))
router.put('organizacao/:id', [OrganizacaoController, 'update']).use(authMiddleware.handle.bind(authMiddleware))
router.delete('organizacao/:id', [OrganizacaoController, 'destroy']).use(authMiddleware.handle.bind(authMiddleware))

// Rota de Login (Sem middleware 'auth')
router.post('login', [AuthController, 'login'])

// Rota de Users (Protegida com middleware 'auth')
router.post('user', [UsersController, 'store']).use(authMiddleware.handle.bind(authMiddleware))
