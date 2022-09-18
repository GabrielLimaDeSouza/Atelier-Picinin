import styles from '../css_components/layout/CabecalhoAdmin.module.css'

import { Link } from 'react-router-dom'

const CabecalhoAdmin = () => {
    return (
        <nav className={styles["div-header"]}>
            <Link to="/">
                <h1 className={styles.logo}>Logo</h1>
            </Link>
            <Link to="/cadastrarProduto">Cadastrar Produtos</Link>
            <Link to="/estoque">Estoque</Link>
        </nav>
    )
}

export default CabecalhoAdmin