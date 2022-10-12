import "../css_components/avaliacao.css"

import { IoStar, IoStarOutline } from 'react-icons/io5'

const avaliacao = ({ nota, avaliador, comentario }) => {
    const estrelas = []

    let i = 1;

    while(i <= nota) {
        estrelas.push(<li className="star"><IoStar className="star" /></li>)
        i++
    }

    for(let w = i; w <= 5; w++) {
        estrelas.push(<li className="star"><IoStarOutline /></li>)
    }

    return (
        <div className="flex">
            <p className="avaliador">{ avaliador }</p>
            <ul className="estrelas">
                { estrelas }
            </ul>
            <p className="comentario">{ comentario }</p>
        </div>
    )
}

export default avaliacao