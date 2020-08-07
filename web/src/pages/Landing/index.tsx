import React, {  useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api'

import './styles.css'

function Landing() {

  const [totalConnections, setTotalConnections] = useState(0)

  useEffect(() => {
    api.get('connections')
      .then(res => {
        const {total} = res.data

        setTotalConnections(total)
      })
  }, [])


  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <h1>Mentor do Bem</h1>
          <h4>Sua plataforma de aprendizado online</h4>
        </div>

        <img src={ landingImg } alt="Hero Img" className="hero-image"/>

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={ studyIcon } alt="Estudar"/>
            Aprender
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={ giveClassIcon } alt="Aula"/>
            Ajudar
          </Link>
        </div>

        <span className="total-connections">
          Total de { totalConnections } conexões ja realizadas
          <img src={ purpleHeartIcon } alt="Coração Roxo"/>
        </span>

      </div>
    </div>
  )
}

export default Landing