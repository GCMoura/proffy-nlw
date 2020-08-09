import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'
import UserController from './controllers/UserController'

const routes  = express.Router()

//Body => (req.body) dados para criação ou atualização do usuário
//Route Params => (req.params) identificar qual recurso eu quero atualizar ou deletar -> /users/:id 
// Query Params => (req.query) Para fazer paginação de usuários, filtors, ordenação, por exemplo


const classesControllers = new ClassesController()
const connectionsController = new ConnectionsController()

const userController = new UserController()

routes.get('/login', userController.index)

routes.post('/login', userController.create)

routes.get('/classes', classesControllers.index)
routes.post('/classes', classesControllers.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes
