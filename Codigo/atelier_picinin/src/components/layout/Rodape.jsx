import styles from '../css_components/layout/Rodape.module.css'

import { BsInstagram, BsWhatsapp } from "react-icons/bs";

function Rodape() {

    return (
        <footer className={styles.footer}>
            <div>
                <p>Atelier Picinin</p>
                <div className={styles.buttonsRodape}>
                    <a><BsInstagram /></a>
                    <a><BsWhatsapp /></a>
                </div>
            </div>
        </footer>
    )
}

export default Rodape
