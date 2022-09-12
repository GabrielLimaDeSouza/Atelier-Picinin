import styles from '../css_components/CardHome.module.css'

import { AiFillStar } from 'react-icons/ai'

const CardHome = ({produtos, key}) => {
  return (
    <div className={styles.card}>
        <img src="" className={styles["card-img-top"]} alt=""></img>
        <div className={styles["card-body"]}>
            <h5 className={styles["card-title"]}>{produtos.nomeProduto}</h5>
            <p className={styles["card-text"]}><AiFillStar className={styles.estrela} /></p>
            <p>R${produtos.precoProduto} <span>por unidade</span></p>
        </div>
    </div>
  )
}

export default CardHome