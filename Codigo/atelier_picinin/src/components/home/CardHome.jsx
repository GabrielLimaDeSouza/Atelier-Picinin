import styles from '../css_components/CardHome.module.css'
import {Link} from 'react-router-dom'

import { AiFillStar } from 'react-icons/ai'



const CardHome = ({produtos, key}) => {
  return (
    <Link to={`/detalhesProduto/${produtos._id}`}>
    <div className={styles.card}>
        <img src={produtos.foto1} className={styles["card-img-top"]} alt="Foto Principal"></img>
        <div className={styles["card-body"]}>
            <h5 className={styles["card-title"]}>{produtos.nomeProduto}</h5>
            <p className={styles["card-text"]}><AiFillStar className={styles.estrela} /></p>
            <p>R${produtos.precoProduto} <span>por unidade</span></p>
        </div>
    </div>
    </Link>
  )
}

export default CardHome