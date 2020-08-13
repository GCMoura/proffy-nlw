import React from 'react'
import api from '../../services/api'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import linkedinIcon from '../../assets/images/icons/linkedin.svg'

import './styles.css'

export interface Teacher {
  id: number,
  avatar: string,
  bio: string,
  cost: string,
  name: string,
  subject: string,
  whatsapp: string,
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id
    })
  }
  
  return (
    <article className="teacher-item">

      <header>
        <img src={ teacher.avatar } alt={ teacher.name }/>
        <strong>{ teacher.name }</strong>
        <span>{ teacher.subject }</span>
      </header>

      <p> { teacher.bio } </p>

      <footer>
        <a href={`${teacher.cost}`} target="_blank">
          <img src={ linkedinIcon } alt="Linkedin"/>
          Conectar
        </a>

        <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`} target="_blank">
          <img src={ whatsappIcon } alt="Whatsapp"/>
          Entrar em contato
        </a>
      </footer>

    </article>
  )
}

export default TeacherItem