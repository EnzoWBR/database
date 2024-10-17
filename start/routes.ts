import AlunosController from '#controllers/alunos_controller'
import AulasController from '#controllers/aulas_controller'
import AuthController from '#controllers/auth_controller'
import EscolasController from '#controllers/escolas_controller'
import OrganizacaoController from '#controllers/organizacao_controller'
import UsersController from '#controllers/users_controller'



import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'Bem vindo ao BANCO DE DADOS',
  }
})
router.get('alunos', [AlunosController, 'index'])
router.post('alunos', [AlunosController, 'store'])
router.get('alunos/:id', [AlunosController, 'show'])
router.put('alunos/:id', [AlunosController, 'update'])
router.delete('alunos/:id', [AlunosController, 'destroy'])


router.get('aulas', [AulasController, 'index'])
router.post('aulas', [AulasController, 'store'])
router.get('aulas/:id', [AulasController, 'show'])
router.put('aulas/:id', [AulasController, 'update'])
router.delete('aulas/:id', [AulasController, 'destroy'])


router.get('escolas', [EscolasController, 'index'])
router.post('escolas', [EscolasController, 'store'])
router.get('escolas/:id', [EscolasController, 'show'])
router.put('escolas/:id', [EscolasController, 'update'])
router.delete('escolas/:id', [EscolasController, 'destroy'])


router.get('organizacao', [OrganizacaoController, 'index'])
router.post('organizacao', [OrganizacaoController, 'store'])
router.get('organizacao/:id', [OrganizacaoController, 'show'])
router.put('organizacao/:id', [OrganizacaoController, 'update'])
router.delete('organizacao/:id', [OrganizacaoController, 'destroy'])

router.post('logint',[AuthController,'login'])

router.post('user',[UsersController,'store'])