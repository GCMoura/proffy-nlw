import { Request, Response } from 'express'
import db from '../database/connection'

interface UserLogin {
  name: string,
  password: string,
}

export default class UserController {
  
  async index(req: Request, res: Response){
    
    const filters = req.query

    const name = filters.name as string
    const password = filters.password as string

    const users = await db('login')
      .select('login.*')
      .where('login.name', '=', name)
      .where('login.password', '=', password)

    return res.json(users)
  }

  async create(req: Request, res: Response){

    const { name, password } = req.body

    const trx = await db.transaction()

    try {
      //cadastro de usuários
      await trx('login').insert({ name, password  })
  
      await trx.commit()
      //aqui é que os dados serão inseridos no db
  
      return res.status(201).send("Login created with success.")
  
    } catch (err) {
  
      await trx.rollback() //desfaz envios incompletos
  
      return res.status(400).json({
        error: 'Unexpected error while creating new login.'
      })
    }
  }
}