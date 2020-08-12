import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string,
}

export default class ClassesController{

  async index(req: Request, res: Response) {
    const filters = req.query

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if(!filters.week_day || !filters.subject || !filters.time){
      return res.status(400).json({
        error: 'Missing filters to search classes.'
      })
    }

    const timeInMinutes = convertHourToMinutes(time)

    //consulta ao banco de dados
    const classes = await db('classes')
	.whereExists(function() {
	  this.select('class_schedule.*')
	    .from('class_schedule')
	    .whereRaw('class_schedule.class_id = classes.id')
	    .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
	    .whereRaw('class_schedule.from <= ??', [timeInMinutes])
	    .whereRaw('class_schedule.to > ??', [timeInMinutes])
	})
	.where('classes.subject', '=', subject)
	.join('users', 'classes.user_id', '=', 'users.id')
	.select(['classes.*', 'users.*'])

      return res.json(classes)
  }

  async create(req: Request, res: Response) {
    // const data = req.body
    // console.log(data) //visualizar os dados
  
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body
  
    const trx = await db.transaction()
    //para que todas as requisições sejam enviadas juntas, e caso alguma falhe o sistema desfaz o que foi enviado incompleto
  
    try {
      //cadastro de usuários
      const insertedUsersIds = await trx('users').insert({ 
        name,
        avatar,
        whatsapp,
        bio,
      }).returning('id')
  
      const user_id = insertedUsersIds[0] //id do usuário
  
      //cadastro das aulas
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      }).returning('id')
  
      const class_id = insertedClassesIds[0]
  
      //cadastro de dias e horários das aulas
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        }
      })
  
      await trx('class_schedule').insert(classSchedule)
  
      await trx.commit()
      //aqui é que os dados serão inseridos no db
  
      return res.status(201).send()
  
    } catch (err) {
  
      await trx.rollback() //desfaz envios incompletos
  
      return res.status(400).json({
        error: 'Unexpected error while creating new class.'
      })
    }
  }

  
}