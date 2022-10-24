import styles from '../css/CardHome.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { AiFillStar } from 'react-icons/ai'

const CardHome = ({ produtos, key }) => {

  const [avaliacoes, setAvaliacoes] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/rating/viewRatingById?id=${key}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
      .then(data => setAvaliacoes(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <Link to={`/detalhesProduto/${produtos._id}`}>
      <div className={styles.card}>
        <img src={produtos.foto1} className={styles["card-img-top"]} alt="Foto Principal"></img>
        <div className={styles["card-body"]}>
          <h5 className={styles["card-title"]}>{produtos.nomeProduto}</h5>
          <p className={styles["card-text"]}>{avaliacoes}<AiFillStar className={styles.estrela} /></p>
          <p>R${produtos.preco} <span>por unidade</span></p>
        </div>
      </div>
    </Link>
  )
}

export default CardHome