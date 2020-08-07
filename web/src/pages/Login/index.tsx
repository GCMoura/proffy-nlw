import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'

import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

import './styles.css'

function Login(){

  const history = useHistory()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleCreateUser(event: FormEvent){
    event.preventDefault()

    console.log(name, password)
    
    api.post('login', {
      name, 
      password 
    }).then(() => {
      alert('Login realizado com sucesso!')
      history.push('/')
    }).catch(() => {
      alert('Erro no cadastro!')
    })

  }

  return (
    <div id="page-user-form" className="container">
      <PageHeader 
        title="Faça seu login"
      />

      <main>
        <form onSubmit={handleCreateUser}>
          <fieldset>
            <legend>Seus dados</legend>
            
            <Input 
              name="name" 
              label="Usuário" 
              value={name} 
              onChange={(event) => { setName(event.target.value) }}
            />
            <Input 
              name="password" 
              label="Password"
              value={password} 
              type="password"
              onChange={(event) => { setPassword(event.target.value) }}
            />            
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Fazer login
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default Login