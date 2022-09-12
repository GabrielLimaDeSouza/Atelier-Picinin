import React from 'react'

import '../pages/css/CardHome.css'
import { AiFillStar } from 'react-icons/ai'

const CardHome = ({produtos,key}) => {
  return (
    <div className="card">
        <img src="" class="card-img-top" alt=""></img>
        <div className="card-body">
            <h5 className="card-title">{produtos.nomeProduto}</h5>
            <p className="card-text"><AiFillStar className='estrela' /></p>
            <p>R${produtos.precoProduto} <span>por unidade</span></p>
        </div>
    </div>
  )
}

export default CardHome