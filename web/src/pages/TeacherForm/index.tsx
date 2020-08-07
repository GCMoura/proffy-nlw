import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

function TeacherForm(){

  const history = useHistory()

  //estado para cada input do formulário
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ])
  
  function addNewScheduleItem() {

    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])

  }

  function handleCreateClass(event: FormEvent){
    event.preventDefault()

    api.post('classes', {
      name, 
      avatar, 
      whatsapp, 
      bio, 
      subject, 
      cost: String(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push('/')
    }).catch(() => {
      alert('Erro no cadastro!')
    })
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if(index === position){
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })
    setScheduleItems(updatedScheduleItem)
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer ajudar!"
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            
            <Input 
              name="name" 
              label="Nome completo" 
              value={name} 
              onChange={(event) => { setName(event.target.value) }}
            />
            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar} 
              onChange={(event) => { setAvatar(event.target.value) }}
            />
            <Input 
              name="whatsapp" 
              label="Whatsapp"
              value={whatsapp} 
              onChange={(event) => { setWhatsapp(event.target.value) }}
            />
            <Textarea 
              name="bio" 
              label="Biografia"
              value={bio} 
              onChange={(event) => { setBio(event.target.value) }} 
            />
            <Input 
            name="cost" 
            label="Perfil no Linkedin"
            value={cost}
            onChange={(event) => { setCost(event.target.value) }} 
          />
            
          </fieldset>

          <fieldset>
          <legend>Sobre a aula</legend>
          
          <Select 
            name="subject" 
            label="Tecnologia"
            value={subject}
            onChange={(event) => { setSubject(event.target.value) }} 
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
              { value: "NodeJS", label: 'NodeJS'},
            ]}
          />
          
        </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="Dia da Semana"
                    value={scheduleItem.week_day}
                    onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
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
                    name="from" 
                    label="Das" 
                    type="time"
                    value={scheduleItem.from}
                    onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                  />
                  <Input 
                    name="to" 
                    label="Até" 
                    type="time"
                    value={scheduleItem.to}
                    onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                  />
            </div>
              )
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm