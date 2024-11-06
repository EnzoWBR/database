import AlunosController from '#controllers/alunos_controller';
import AulasController from '#controllers/aulas_controller';
import AuthController from '#controllers/auth_controller';
import EscolasController from '#controllers/escolas_controller';
import OrganizacaoController from '#controllers/organizacao_controller';
import UsersController from '#controllers/users_controller';

import router from '@adonisjs/core/services/router';
import AuthMiddleware from '#middleware/auth_middleware';

const authMiddleware = new AuthMiddleware();

router.get('/', async () => {
  return {
    hello: 'Bem vindo ao BANCO DE DADOS',
  }
});

// Rotas de Alunos
router.get('alunos', [AlunosController, 'index'])
router.post('alunos', [AlunosController, 'store']).use(authMiddleware.handle.bind(authMiddleware));
router.get('alunos/:id', [AlunosController, 'show']).use(authMiddleware.handle.bind(authMiddleware));
router.put('alunos/:id', [AlunosController, 'update']);
router.delete('alunos/:id', [AlunosController, 'destroy']);

// Rotas de Aulas
router.get('aulas', [AulasController, 'index'])
router.post('aulas', [AulasController, 'store']).use(authMiddleware.handle.bind(authMiddleware));
router.get('aulas/:id', [AulasController, 'show']) .use(authMiddleware.handle.bind(authMiddleware));
router.put('aulas/:id', [AulasController, 'update'])
router.delete('aulas/:id', [AulasController, 'destroy'])

// Rotas de Escolas
router.get('escolas', [EscolasController, 'index'])
router.post('escolas', [EscolasController, 'store']).use(authMiddleware.handle.bind(authMiddleware));
router.get('escolas/:id', [EscolasController, 'show']).use(authMiddleware.handle.bind(authMiddleware));
router.put('escolas/:id', [EscolasController, 'update'])
router.delete('escolas/:id', [EscolasController, 'destroy'])

// Rotas de Organização
router.get('organizacao', [OrganizacaoController, 'index'])
router.post('organizacao', [OrganizacaoController, 'store'])
router.get('organizacao/:id', [OrganizacaoController, 'show']).use(authMiddleware.handle.bind(authMiddleware));
router.put('organizacao/:id', [OrganizacaoController, 'update'])
router.delete('organizacao/:id', [OrganizacaoController, 'destroy'])


router.post('login', [AuthController, 'login']);


router.post('user', [UsersController, 'store']).use(authMiddleware.handle.bind(authMiddleware));
