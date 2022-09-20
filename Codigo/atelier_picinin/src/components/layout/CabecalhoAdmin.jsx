import styles from '../css_components/layout/CabecalhoAdmin.module.css'

import { Link } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { useState, useEffect } from 'react'

const CabecalhoAdmin = () => {
    // const [pageLocation, setPageLocation] = useState("home");

    // useEffect(() => {
    //     const navbarItem = document.querySelector(`#${pageLocation}`)
    //     navbarItem.className = "active"
    //     console.log(pageLocation)
    // }, [])

    // function teste(e) {
    //     console.log(e.target.id)
    //     const navbarItem = document.querySelector(`#${id}`)
    //     navbarItem.className = "active"
    //     setPageLocation(e.target.id)
    // }
    return (
        <nav className={styles["div-header"]}>
            <div className={styles["logo-menu"]}>
                <h1 className={styles.logo}>Logo</h1>
                <div className={styles.menu}>
                    <Link id="home" to="/">Home</Link>
                    <Link id="cadastrarProduto" to="/cadastrarProduto">Cadastrar Produtos</Link>
                    <Link id="estoque" to="/estoque">Estoque</Link>
                </div>
            </div>
            <Link to="/"><BiUser /></Link>
        </nav>
    )
}

export default CabecalhoAdmin