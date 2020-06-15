import React from 'react'
import { Link } from 'react-router-dom'

import Robo from '../../assets/robo.png'

import './styles.css'
import './response.css'

export default function NotFound(){
    return(
        <div className="content">
            <h1>Não foi possível encontrar esta página :(</h1>
            <h4 className="h4">A URL que você está tentando acessar não existe ou não está disponível, 
                tente novamente mais tarde ou volte para a Home.</h4>
            <Link className="backHome" to="/">
                <button>Voltar para a Home</button>
            </Link>
            <img src={Robo} alt="Robo" width="360px" height="300px"/>
        </div>
    )
}