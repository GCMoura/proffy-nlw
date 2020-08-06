import React, {useState, FormEvent} from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'

import './styles.css'

function TeacherList() {

  const [teachers, setTeachers] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeek_day] = useState('')
  const [time, setTime] = useState('')

  async function searchTeachers(event: FormEvent){
    event.preventDefault()
    
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    })

    setTeachers(response.data)

  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estas pessoas estão dispostas a te ajudar">
        <form id="search-teachers" onSubmit={searchTeachers}>
          
          <Select 
            name="subject" 
            label="Tecnologia"
            value={subject}
            onChange={event => { setSubject(event.target.value) }}
            options={[
              { value: "HTML5", label: 'HTML5'},
              { value: "CSS3", label: 'CSS3'},
              { value: "Javascript", label: 'Javascript'},
              { value: "TypeScript", label: 'TypeScript'},
              { value: "PHP", label: 'PHP'},
              { value: "Java", label: 'Java'},
              { value: "C", label: 'C'},
              { value: "C++", label: 'C++'},
              { value: "C#", label: 'C#'},
              { value: "Python", label: 'Python'},
              { value: "NodeJs", label: 'NodeJs'},
            ]}  
          />
          <Select 
            name="week_day" 
            label="Dia da Semana"
            value={week_day}
            onChange={event => { setWeek_day(event.target.value) }}
            options={[
              { value: "0", label: 'Domingo'},
              { value: "1", label: 'Segunda-Feira'},
              { value: "2", label: 'Terça-Feira'},
              { value: "3", label: 'Quarta-Feira'},
              { value: "4", label: 'Quinta-Feira'},
              { value: "5", label: 'Sexta-Feira'},
              { value: "6", label: 'Sábado'},
            ]}  
          />
          
          <Input 
            type="time" 
            name="time" 
            label="Hora"
            value={time}
            onChange={event => { setTime(event.target.value) }}
          />

          <button type="submit">
            Buscar
          </button>

        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return  <TeacherItem key={teacher.id} teacher={teacher}/>
        })}

      </main>

    </div>
  )
}

export default TeacherList