import React, { useState, FormEvent } from 'react'
import { useHistory, Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'

import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

import './styles.css'

function Login(){

  const history = useHistory()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  async function handleCreateUser(event: FormEvent){
    event.preventDefault()
    
    const response = await api.get('login', {
      params: {
        name, 
        password 
      }
    })

    if(response.data.length !== 0){
      alert('Login realizado com sucesso!')
      history.push(`/user/${name}`)
    } else {
      alert('Usuário ou senha incorretos. Por favor refaça o seu login.')
    }
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
            <p>
              Ainda não tem uma conta? <br/>
              Cadastre-se clicando 
              <Link to="/account"> Aqui</Link> 
            </p>       
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