import '../css/home/Home.css'

import Card from '../../components/home/module/CardHome'
import { useState, useEffect } from 'react'
import { BsWhatsapp, BsInstagram } from 'react-icons/bs'
import Rodape from '../../components/layout/Rodape'

const Home = () => {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/produto/getAllProducts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(data => setProdutos(data))
      .catch(err => console.error(err))
  }, [])


  return (
    <>
      <div className='body-home'>
        <div className='banner'>
          <div className='informacoes'>
            <h2 className='atelierPicinin'>Atelier Picinin</h2>
            <p className='descricao'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sed eaque corrupti deleniti optio dicta animi odio aspernatur esse reprehenderit!</p>
            <div className='banner-buttons'>
              <a href='#' target="_blank"><BsWhatsapp /></a>
              <a href='https://www.instagram.com/atelierpicinin/' target="_blank"><BsInstagram /></a>
            </div>
          </div>
          <div className='img'>
            <img src="../.././../doce.png" alt="Doce" className="img-doce" />
          </div>
        </div>
        <div className="div-cardapio">
          <h3 className='h1Cardapio'>Cardápio</h3>
          <p className='pCardapio'>Todos os produtos são por encomenda</p>
          <div className='cards'>
            {
              produtos.map(produto =>
                <Card id={produto.id} key={produto.id} produtos={produto} />
              )
            }
          </div>
        </div>
      </div>
      <Rodape />
    </>
  )
}

export default Home