import '../css/products/DetalhesProduto.css'

import CabecalhoCliente from '../../components/layout/CabecalhoCliente'
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../img/SUSPIROVERDE.png'
import image2 from '../img/SUSPIRODOURADO.png'
import image3 from '../img/SUSPIROBRANCO.png'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import oneStar from '../img/goldstar.png'


const DetalhesProduto = () => {




    return (

        <>
            <CabecalhoCliente />
            <div className='Body-detalhes-produto' style={{ width: '100%', padding: '0rem 4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1></h1>
                </div>

                <br />

                <div class="container">
                    <div class="row gx-4 ">

                        <div class="col-md-6" style={{paddingLeft: '0rem' }}>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image1}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Nome do Doce</h3>
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
                                        <h3>Nome do Doce</h3>
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
                                        <h3>Nome do Doce</h3>
                                        <p>Frase legal de marketing do doce</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>

                        <div class='col-md-6' >
                            <div><br /><br /><br />
                                <h1>Nome do Produto</h1>
                                <div>
                                <span>4,6 </span>
                                <span ><img src={oneStar} style={{width:'12px', paddingBottom: '4px'}} /></span>
                                <span>  3 reviews</span>
                                </div><br />
                                
                                <span><span>R$200</span> por unidade</span><br /><br />
                            </div>
                            <div class="row gx-4 ">
                                <div class="col-md-6">Sabores
                                <br />
                                    <div>
                                        <ButtonGroup aria-label="Basic example" size='sm'>
                                            <Button variant="secondary">Chocolate</Button>
                                            <Button variant="secondary">Morango</Button>
                                            <Button variant="secondary">Banana</Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div>Quantidade
                                    <input type="number" />
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt incidunt error ex nulla, hic reprehenderit, ipsa dolorem odio corporis quos ratione expedita maiores consequatur. Veniam ipsa commodi rerum nesciunt numquam.
                </div>
                </div>
                
            </div>
        </>
    )
}

export default DetalhesProduto