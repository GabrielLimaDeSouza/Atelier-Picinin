import '../css/Products/DetalhesProduto.css'

import Carousel from 'react-bootstrap/Carousel'
import Button from '../../components/layout/Button'
import Modal from 'react-bootstrap/Modal'
import ButtonModal from 'react-bootstrap/Button'
import Compavaliacao from '../../components/layout/Avaliação'
import Message from "../../components/layout/Message"
import Loading from '../../components/layout/Loading'


import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"

const url = "http://localhost:3000"

const DetalhesProduto = () => {
    var nota = 1

    const { id } = useParams()
    const [produto, setProduto] = useState([])
    const [avaliacoes, setAvaliacoes] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")
    const [typeMessage, setTypeMessage] = useState("")
    const [show, setShow] = useState(false)
    const [sabores, setSabores] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [media, setMedia] = useState(0)
    const [quantidade, setQuantidade] = useState(0)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        fetch(`${url}/produto/getProductById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => {
                setProduto(data)
                setQuantidade(data.pedidoMinProduto)
            })
            .then(setTimeout(() => setIsLoading(false), 300))
            .catch(err => console.error(err))

        fetch(`http://localhost:3000/rating/viewRatingById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => setAvaliacoes(data))
            .catch(err => console.error(err))

        if(location.state.message) {
            setMessage(location.state.message)
            setTypeMessage("success")
            setShowMessage(true)
        }
    }, [])

    useEffect(() => {
        if (mediaNotas() != "NaN") {
            setMedia(mediaNotas)
        }
    }, [avaliacoes])

    var mongoObjectId = () => {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16)
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16)
        }).toLowerCase()
    }

    function addProdutoCarrinho() {
        const data = window.localStorage.getItem("user-cart")
        const carrinho = data ? JSON.parse(data) : []

        sabores.forEach(sabor => {
            if (!carrinho.find(produto => produto.sabores === sabor.sabor)) {
                let precoTotal = sabor.preco * quantidade
                carrinho.push({
                    idCarrinho: mongoObjectId(),
                    _id: produto._id,
                    img: produto.foto1,
                    nome: produto.nomeProduto,
                    preco: sabor.preco,
                    quantidade: quantidade,
                    precoTotal: precoTotal,
                    sabor: sabor.sabor,
                    pedidoMinProduto: produto.pedidoMinProduto
                })
            }
        })

        window.localStorage.setItem("user-cart", JSON.stringify(carrinho))

        navigate("/carrinho")
    }

    function handleAddSabores(saborParam) {
        const saboresOptions = document.querySelectorAll('span.option-sabor')
        const saborSelected = Array.from(saboresOptions).find(selected => selected.textContent == saborParam.sabor)

        if (!sabores.find(saborHook => saborHook.sabor === saborParam.sabor)) {
            setSabores(sabores => [...sabores, { sabor: saborParam.sabor, preco: saborParam.preco }])

            saborSelected.classList.add("selected")
        } else {
            setSabores(sabores.filter(sabor => sabor.sabor != saborParam.sabor))
            saborSelected.classList.remove("selected")
        }
    }

    function handleClickStar(e) {
        var stars = document.querySelectorAll('.star-icon-review')
        var classStar = e.target.classList

        if (!classStar.contains('ativo')) {
            stars.forEach((star) => star.classList.remove('ativo'))

            classStar.add('ativo')

            nota = e.target.getAttribute('data-avaliacao')
        }
    }

    function createRating(input) {
        input.data = new Date().toISOString()

        fetch(`${url}/rating/ratingRegister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "produto": produto._id,
                cliente: "Cliente",
                comentario: document.getElementById("comentario").value,
                nota: nota,
                data: input.data
            })
        }).then(resp => resp.json())
            .then(handleClose)
            .then(navigate(`/detalhesProduto/${id}`, { state: { message: "Avaliação cadastrada com sucesso!"}}))
            .catch(() => {
                setMessage("Houve um erro ao adicionar uma avaliação")
                setTypeMessage("error")
                setShowMessage(true)
            })
    }

    function addQuantity() {
        setQuantidade(quantidade + produto.pedidoMinProduto)
    }

    function decrementQuantity() {
        if (quantidade >= produto.pedidoMinProduto)
            setQuantidade(quantidade - produto.pedidoMinProduto)
    }

    function mediaNotas() {
        var media = 0

        avaliacoes.forEach(avaliacao => {
            media += avaliacao.nota
        })

        return (media / avaliacoes.length).toFixed(1)
    }

    function isFloat(x) {
        if (!isNaN(x)) {
            if (parseInt(x) != parseFloat(x)) {
                return true;
            }
        }

        return false;
    }

    const estrelas = []

    let i = 1;

    while (i <= Math.floor(media)) {
        estrelas.push(<li className="star"><IoStar className="star" /></li>)
        i++
    }

    for (let w = i; w <= 5; w++) {
        estrelas.push(<li className="star"><IoStarOutline /></li>)
    }

    if (isFloat(media)) {
        estrelas[Math.floor(media)] = <li className="star"><IoStarHalf className="star" /></li>
    }

    return (
        !isLoading ?
            <div className='body-detalhes-produto'>
                <div className="infos">
                    <div className="carrosel">
                        <Carousel>
                            <Carousel.Item>
                                <img className="d-block w-0 img-produto" src={produto.foto1} alt="First slide" />
                            </Carousel.Item>

                            <Carousel.Item>
                                <img className="d-block w-0 img-produto" src={produto.foto2} alt="Second slide" />
                            </Carousel.Item>

                            <Carousel.Item>
                                <img className="d-block w-0 img-produto" src={produto.foto3} alt="Third slide" />
                            </Carousel.Item>
                        </Carousel>
                    </div>

                    <div className="infos-produto">
                        <div className="tite">
                            <h1>{produto.nomeProduto}</h1>

                            <div className="spans-infos">
                                <div className="span-review">
                                    <span className="star-review"> {media}</span>
                                    <span className="ponto"></span>
                                    <span>{avaliacoes.length} reviews</span>
                                </div>
                            </div>
                        </div>

                        <div className="preco-produto">
                            <span className="preco-produto">R$ {produto.preco}</span>
                            <span>por Unidade</span>
                        </div>

                        <div className="sabor-quantidade">
                            <div className="div-sabores">
                                <span className="label-sabores">Sabores</span>
                                <div className="options">
                                    {produto.sabores.map(sabor => <span className="option-sabor" onClick={() => handleAddSabores(sabor)}>{sabor.sabor}</span>)}
                                </div>
                            </div>

                            <div className="encomenda">
                                <span className="label-encomenda">Encomenda:</span>

                                <div className="quantidade">
                                    <span className="label-quantidade">Quantidade:</span>

                                    <div className="quantityManipulation">
                                        <Button type="button" className="remove-quantity" buttonClickEvent={decrementQuantity}>-</Button>
                                        <span className="quantity">{quantidade}</span>
                                        <Button type="button" className="add-quantity" buttonClickEvent={addQuantity}>+</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            {quantidade != 0 ?
                                <Button type="button" buttonClickEvent={addProdutoCarrinho} className='btnAdicionarCarrinho'>Adicionar no Carrinho</Button>
                                :
                                <Button disabled>Adicionar no Carrinho</Button>
                            }
                        </div>
                    </div>
                </div>

                <div className="descricao-produto">
                    <h3>Informações do Produto</h3>
                    <div>{produto.descricaoProduto}</div>
                </div>

                {showMessage && <Message type={typeMessage} message={message} showMessage={setShowMessage} />}

                {media ?
                    <div className="div-avaliacao">
                        <div className="media-avaliacao">
                            <span className="media">{media}</span>
                            <span className="nota-maxima">de 5.0</span>

                            <ul className="ulavaliacao media-nota">
                                {estrelas}
                            </ul>
                        </div>

                        <div className="total-avaliacao">
                            <span className="total">Total de avaliações ({avaliacoes.length})</span>
                        </div>
                        <div className="div-btn-avaliar">
                            <Button className="btnAvaliar" variant="primary" buttonClickEvent={handleShow}>
                                Avaliar
                            </Button>

                        </div>

                        {avaliacoes.map(avaliacao =>
                            <Compavaliacao nota={avaliacao.nota} comentario={avaliacao.comentario} avaliador={avaliacao.cliente} data={avaliacao.data} />
                        )}
                    </div>
                    :
                    <div className="sem-media">Este produto ainda não possui avaliações</div>
                }

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Realizar Avaliação</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <label htmlFor="comentario">Comentario:</label>
                        <input type="text" name="comentario" id="comentario" required />
                        <p>Nota:</p>
                        <ul className="ulavaliacaomodal">
                            <li className="star-icon-review ativo" data-avaliacao="1" onClick={handleClickStar}></li>
                            <li className="star-icon-review" data-avaliacao="2" onClick={handleClickStar}></li>
                            <li className="star-icon-review" data-avaliacao="3" onClick={handleClickStar}></li>
                            <li className="star-icon-review" data-avaliacao="4" onClick={handleClickStar}></li>
                            <li className="star-icon-review" data-avaliacao="5" onClick={handleClickStar}></li>
                        </ul>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonModal variant="secondary" onClick={handleClose}>
                            Fechar
                        </ButtonModal>
                        <ButtonModal className="btn-enviar" variant="primary" onClick={createRating}>
                            Enviar
                        </ButtonModal>
                    </Modal.Footer>
                </Modal>
            </div>
            :
            <div>
                <Loading />
            </div>
    )
}

export default DetalhesProduto