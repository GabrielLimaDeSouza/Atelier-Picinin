import { BsStar } from "react-icons/bs"
import { BsStarFill } from 'react-icons/bs'
import "../css_components/avaliacao.css"
import { BsStarHalf } from "react-icons/bs";

const style = { color: "yellow", fontSize: "1.2em" }

const avaliacao = ({nota, avaliador, comentario}) => {
    return (
        <>

            <div className="flex">
                <div className="avaliador">{avaliador}</div>
                <div >
                    {
                        nota == 1 ? (
                            <BsStarFill style={style} />
                        ) : nota > 0 && nota < 1 ? (<BsStarHalf style={style} />) : nota > 1 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        nota == 2 ? (
                            <BsStarFill style={style} />
                        ) : nota > 1 && nota < 2 ? (<BsStarHalf style={style} />) : nota > 2 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        nota == 3 ? (
                            <BsStarFill style={style} />
                        ) : nota > 2 && nota < 3 ? (<BsStarHalf style={style} />) : nota > 3 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        nota == 4 ? (
                            <BsStarFill style={style} />
                        ) : nota > 3 && nota < 4 ? (<BsStarHalf style={style} />) : nota > 4 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        nota == 5 ? (
                            <BsStarFill style={style} />
                        ) : nota > 4 && nota < 5 ? (<BsStarHalf style={style} />) : nota < 5 ? (
                            (<BsStar style={style}/>)
                        ) : (<BsStar style={style} />)
                    }

                </div>




                <div><p>{comentario}</p> </div>
            </div>
            <hr />
        </>
    )
}

export default avaliacao