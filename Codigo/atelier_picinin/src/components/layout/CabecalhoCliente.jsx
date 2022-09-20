import styles from '../css_components/layout/CabecalhoCliente.module.css'

import { BiUser } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const CabecalhoCliente = () => {
    return (
        <nav className={styles["div-header"]}>
            <div className={styles["logo-menu"]}>
                <h1 className={styles.logo}>Logo</h1>
                <div className={styles.menu}>
                    <Link id="home" to="/">Home</Link>
                    <Link id="contatos" to="/">Contatos</Link>
                </div>
            </div>
            <div className={styles.buttons}>
                <Link to="/carrinho" className={styles.carrinho}><AiOutlineShoppingCart /></Link>
                <Link to="/" className={styles.perfil}><BiUser /></Link>
            </div>
        </nav>
    )
}

export default CabecalhoCliente