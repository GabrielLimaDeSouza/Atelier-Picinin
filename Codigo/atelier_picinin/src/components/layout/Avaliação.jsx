import { BsStar } from "react-icons/bs"
import { BsStarFill } from 'react-icons/bs'
import "../css_components/avaliacao.css"
import { BsStarHalf } from "react-icons/bs";

var teste = 3.5
const style = { color: "red", fontSize: "1.2em" }

const avaliacao = () => {
    return (
        <>

            <div className="flex">
                <div className="avaliador"><p style={style}>Carlão</p></div>
                <div >
                    {
                        teste == 1 ? (
                            <BsStarFill style={style} />
                        ) : teste > 0 && teste < 1 ? (<BsStarHalf style={style} />) : teste > 1 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        teste == 2 ? (
                            <BsStarFill style={style} />
                        ) : teste > 1 && teste < 2 ? (<BsStarHalf style={style} />) : teste > 2 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        teste == 3 ? (
                            <BsStarFill style={style} />
                        ) : teste > 2 && teste < 3 ? (<BsStarHalf style={style} />) : teste > 3 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        teste == 4 ? (
                            <BsStarFill style={style} />
                        ) : teste > 3 && teste < 4 ? (<BsStarHalf style={style} />) : teste > 4 ? (
                            <BsStarFill style={style} />
                        ) : (<BsStar style={style} />)
                    }

                    {
                        teste == 5 ? (
                            <BsStarFill style={style} />
                        ) : teste > 4 && teste < 5 ? (<BsStarHalf style={style} />) : teste < 5 ? (
                            (<BsStar style={style}/>)
                        ) : (<BsStar style={style} />)
                    }

                </div>




                <div>Tava uma delicia, hmmmmmm </div>
            </div>
        </>
    )
}

export default avaliacao