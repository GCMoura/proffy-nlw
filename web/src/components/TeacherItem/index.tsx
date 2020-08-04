import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="" alt=""/>
        <strong>Nome</strong>
        <span>Química</span>
      </header>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        <br/> <br/>
        Magni deleniti ducimus soluta aspernatur voluptatem iste, natus pariatur sint accusamus? Non dignissimos explicabo cumque voluptatem, nostrum architecto! Veritatis laudantium assumenda quis.
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$20,00</strong>
        </p>
        <button type="button">
          <img src={ whatsappIcon } alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>

    </article>
  )
}

export default TeacherItem