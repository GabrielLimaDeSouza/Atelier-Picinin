import '../pages/css/Rodape.css'
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
function Rodape() {

    return (
        <footer className='color'>
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
