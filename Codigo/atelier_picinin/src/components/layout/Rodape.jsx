import '../css_components/layout/Rodape.css'

import { BsInstagram, BsWhatsapp } from "react-icons/bs";

function Rodape() {

    return (
        <footer className="footer">
            <div>
                <p>Atelier Picinin</p>
                <div className="buttonsRodape">
                    <a><BsInstagram /></a>
                    <a><BsWhatsapp /></a>
                </div>
            </div>
        </footer>
    )
}

export default Rodape
