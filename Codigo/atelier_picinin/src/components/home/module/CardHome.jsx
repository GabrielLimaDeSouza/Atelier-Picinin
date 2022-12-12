import styles from '../css/CardHome.module.css'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'

const url = "http://localhost:3000"

const CardHome = ({ produto }) => {

  const [avaliacoes, setAvaliacoes] = useState([])

  useEffect(() => {
    console.log(produto)

    fetch(`${ url }/rating/viewRatingById?id=${ produto._id }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(data => {
        setAvaliacoes(data)
        console.log(data)
      })
      .catch(err => console.error(err))
  }, [])

  function mediaNota(arr) {
    return (arr.map(({ nota }) => nota).reduce((media, nota) => media + nota, 0) / arr.length)
  }

  function menorValor(arr) {
    const precos = arr.map(({ preco }) => preco)
    return Math.min(...precos)
  }

  return (
    <Link to={ `/detalhesProduto/${ produto._id }` }>
      <div className={ styles.card }>
        <img src={ produto.foto1 } className={ styles["card-img-top"] } alt="Foto Principal"></img>

        <div className={ styles["card-body"] }>
          <h5 className={ styles["card-title"] }>{ produto.nomeProduto }</h5>
          <p className={ styles.notaCardHome }>
             { avaliacoes.length > 0 &&
                  <>  
                      <div>
                          <span className={ styles.mediaNota }>{ mediaNota(avaliacoes).toFixed(1) }<AiFillStar className={styles.estrela} /></span>
                      </div>
                          
                      <span className="ponto"></span>
                  </>
              }
              <span>{ avaliacoes.length } reviews</span>
          </p>
          <p className={ styles.precoProduto }>
              <span className="aPartirDe">A partir de </span>
              R$ { menorValor(produto.sabores).toFixed(2) }
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CardHome