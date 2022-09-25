import '../css/Products/DetalhesProduto.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CabecalhoCliente from '../../components/layout/CabecalhoCliente'
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../img/SUSPIROVERDE.png'
import image2 from '../img/SUSPIRODOURADO.png'
import image3 from '../img/SUSPIROBRANCO.png'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import oneStar from '../img/goldstar.png'


const DetalhesProduto = () => {

    const { id } = useParams()
    const [produto, setProduto] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch(`http://localhost:3000/produto/getProductById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(data => setProduto(data))
            .catch(err => console.error(err))
    }, [])

    return (

        <>
            <CabecalhoCliente />
            <div className='Body-detalhes-produto' style={{ width: '100%', padding: '0rem 4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1></h1>
                </div>

                <br />

                <div className="container">
                    <div className="row gx-4 ">

                        <div className="col-md-6" style={{ paddingLeft: '0rem' }}>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image1}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>{produto.nomeProduto}</h3>
                                        <p>Frase legal de marketing do doce</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image2}
                                        alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>{produto.nomeProduto}</h3>
                                        <p>Frase legal de marketing do doce</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image3}
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>{produto.nomeProduto}</h3>
                                        <p>Frase legal de marketing do doce</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>

                        <div className='col-md-6' >
                            <div><br /><br /><br />
                                <h1>{produto.nomeProduto}</h1>
                                <div>
                                    <span>4,6 </span>
                                    <span ><img src={oneStar} style={{ width: '12px', paddingBottom: '4px' }} /></span>
                                    <span>  3 reviews</span>
                                </div><br />

                                <span><span>R${produto.precoProduto}</span> por unidade</span><br /><br />
                            </div>
                            <div className="row gx-4 ">
                                <div className="col-md-6">Sabores
                                    <br />
                                    <div>
                                        <ButtonGroup aria-label="Basic example" size='sm'>
                                            <Button variant="secondary">Chocolate</Button>
                                            <Button variant="secondary">Morango</Button>
                                            <Button variant="secondary">Banana</Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>Quantidade
                                        <input type="number" style={{ border: '1px solid black' }} step={produto.pedidoMinProduto} min={produto.pedidoMinProduto} />
                                    </div>
                                </div>
                            </div><br /><br /><br /><br /><br /><br /><br /><br />
                            <div>
                                <Button variant="outline-secondary">Adicionar no Carrinho</Button>{' '}
                            </div>
                        </div>


                    </div>
                </div><br /><br />
                <div style={{ width: '100%', padding: '0rem 4rem' }}>
                    <h1 >Informações do Produto</h1><br />
                    <div>
                        {produto.descricaoProduto}
                    </div>
                </div>
                <div className="avaliacao">
                    <Button className="btn-avaliar" variant="primary" onClick={handleShow}>
                        Avaliar
                    </Button>

                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Realizar Avaliação</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label htmlFor="comentario">Comentario:</label>
                            <input type="text" name="comentario" id="comentario" />
                            <p>Nota:</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Fechar
                            </Button>
                            <Button className="btn-enviar" variant="primary" onClick={handleClose}>
                                Enviar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default DetalhesProduto