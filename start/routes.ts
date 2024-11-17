/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const TodoCardsController = () => import('#controllers/todo_cards_controller')

router.on('/').render('pages/home')
router.get('/todo_cards', [TodoCardsController, 'getAll'])
router.post('/todo_cards', [TodoCardsController, 'addOne'])
router.get('/todo_cards/:id', [TodoCardsController, 'getOne'])
router.put('/todo_cards/:id', [TodoCardsController, 'update'])
router.delete('/todo_cards/:id', [TodoCardsController, 'delete'])
