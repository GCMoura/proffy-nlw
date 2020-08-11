import React from 'react'

import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

interface PageHeaderProps {
  title: string;
  description?: string;
  path?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

  const key = Math.random().toString(32).substr(2, 9)

  return (
      <header className="page-header">
        <div className="top-bar-container">
          <Link to={`/${props.path}/${key}`}>
            <img src={ backIcon } alt="Voltar"/> 
          </Link>
          
          {/* <img src={ logoImg } alt="Logo"/> */}
          <span>Mentor do Bem</span>

          <div className="header-content">
            <strong>{ props.title }</strong>
            { props.description && <p>{ props.description }</p> }

            { props.children }
          </div>

        </div>

      </header>
  )
}

export default PageHeader