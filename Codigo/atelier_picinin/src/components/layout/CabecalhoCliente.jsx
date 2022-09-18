import styles from '../css_components/layout/CabecalhoCliente.module.css'

import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const CabecalhoCliente = () => {
    return (
        <nav className={styles["div-header"]}>
            <h1 className={styles.logo}>Logo</h1>
            <div className={styles.buttons}>
                <button className={styles.carrinho}><AiOutlineShoppingCart /></button>
                <button className={styles.perfil}><BiUserCircle /></button>
            </div>
        </nav>
    )
}

export default CabecalhoCliente