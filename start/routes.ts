import AlunosController from '#controllers/alunos_controller'
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