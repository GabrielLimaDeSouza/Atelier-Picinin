import '../css/Products/CadastrarProduto.css'
import styles from '../../components/css_components/Form.module.css'


import Avaliacao from "../../components/layout/Avaliação"
import Form from "../../components/products/FormCadastroProdutos"
import Button from "../../components/layout/Button"
import Message from "../../components/layout/Message"

import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"

var sabores = []
var lenghtSabor = 0
var contadorSabor = 0
const CadastrarProduto = () => {
    const [produtos, setProdutos] = useState([])
    const [sabor, setSabor] = useState([])
    const [id, setId] = useState({})
    const [message, setMessage] = useState('')
    const [indiceSabor, setIndiceSabor] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const url = 'http://localhost:3000'
    useEffect(() => {
        fetch(`${url}/produto/getAllProducts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json())
            .then(data => setProdutos(data))
            .catch(err => console.error(err))
    })

    useEffect(() => {
        fetch(`${url}/produto/getAllSabores`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json())
            .then(data => setSabor(data))
            .catch(err => console.error(err))
    }, [])

    var dadosJson
    var arreyFotos = []
    var arreyFotosNovas = []
    var controle = 0

    useEffect(() => {
        const token = "IGQVJVTDd5dnpzWlhnWVAwTlR4cFZAvTEY1MnNKci1oczBnRDFDejhrSGRSOEJFQUc4Q1lQZAHBCOTBqS25YMm5QcS1qSC1GZAXRFSVdxNlJ1cm5IUzU2THAyaW53UDh4eE5Ea2FtRGN3X3AteFZAnQURZAagZDZD"
        const urlInsta = "https://graph.instagram.com/me/media?access_token=" + token + "&fields=media_url,media_type,caption,permalink"

        fetch(urlInsta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (controle == 0) {
                    dadosJson = data.data

                    for (let i = 0; i < dadosJson.length && i < 10; i++) {
                        var feed = dadosJson[0]

                        var oImg = document.createElement("img")
                        oImg.setAttribute("src", feed.media_url)
                        oImg.setAttribute("alt", "na")
                        oImg.setAttribute("height", "100px")
                        oImg.setAttribute("width", "100px")
                        oImg.addEventListener("click", salvaImg.bind(null, feed.media_url))
                        document.getElementById("instas").appendChild(oImg)
                        var oImg = document.createElement("img")
                        oImg.setAttribute("src", feed.media_url)
                        oImg.setAttribute("alt", "na")
                        oImg.setAttribute("height", "100px")
                        oImg.setAttribute("width", "100px")
                        oImg.addEventListener("click", updateImg.bind(null, feed.media_url))
                        document.getElementById("instasUpdate").appendChild(oImg)
                    }
                }

                controle = 1
            })
            .catch((err) => console.error(err))
    }, [])

    function handleSaboresProduto(sabor) {
        if (sabor.length > 0) {
            sabores = sabor
            lenghtSabor = sabores.length
            console.log(lenghtSabor)
        } else {
            lenghtSabor = 0
        }

        console.log(sabores)
    }

    function createProduto(e) {
        e.preventDefault()

        fetch(`${url}/produto/registerProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                "nome": document.getElementById("nome").value,
                "descricao": document.getElementById("descricao").value,
                "saborProduto": document.getElementById("sabor").value,
                "preco": document.getElementById("preco").value,
                "pedidoMinProduto": document.getElementById("pedidoMinProduto").value,
                "foto1": document.getElementById("foto1").value,
                "foto2": document.getElementById("foto2").value,
                "foto3": document.getElementById("foto3").value,
                "sabores": sabores,
                "lenght": lenghtSabor

            },
            )
        }).catch(err => console.error(err))

        setMessage("Produto cadastrado com sucesso!")
    }
    function updateProduto(e) {
        e.preventDefault()

        fetch(`http://localhost:3000/produto/updateProduct/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                updatenome: document.getElementById("updateNome").value,
                updatedescricao: document.getElementById("updateDescricao").value,
                updatepreco: parseInt(document.getElementById("updatePreco").value),
                updatepedidoMinProduto: parseInt(document.getElementById("updatePedidoMinProduto").value),
                updatefoto1: document.getElementById("updateFoto1").value,
                updatefoto2: document.getElementById("updateFoto2").value,
                updatefoto3: document.getElementById("updateFoto3").value
            })
        }).catch((err) => console.error(err))

        setMessage("Produto atualizado com sucesso!")
    }


    function updateSabor() {

        fetch(`http://localhost:3000/produto/updateSabor/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                indiceSabor: indiceSabor,
                sabor: document.getElementById("updateSabor").value,
                preco: document.getElementById("updatePrecoSabor").value
            })
        }).catch(err => console.error(err))

        setMessage("Sabor atualizado com sucesso!")
    }

    function createSabor() {

        fetch(`http://localhost:3000/produto/createSabor/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                sabor: document.getElementById("createSabor").value,
                preco: document.getElementById("createPrecoSabor").value
            })
        }).catch(err => console.error(err))

        setMessage("Sabor atualizado com sucesso!")
    }
    // Identificar a linha da tabela clicada
    function idTrClicada(e) {
        const tr = e.target
        var element = tr.parentNode
        while (element.id == false) {
            element = element.parentNode
            return element.id
        }
    }

    function deletProduct(id) {
        fetch(`http://localhost:3000/produto/deleteProduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then(() => {
                setProdutos(produtos.filter((produto) => produto.id !== id))
                setMessage("Produto removido com sucesso!")
            })
            .catch((err) => console.error(err))
    }
    function deleteSabor(id, indice) {

        fetch(`http://localhost:3000/produto/deleteSabor/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                indiceSabor: indice
            })
        }).then(resp => resp.json())
            .then(() => {
                setMessage("Sabor removido com sucesso!")
            })
            .catch(err => console.error(err))
    }
    function salvaImg(imgLink) {
        if (arreyFotos.indexOf(imgLink) == null) {
            arreyFotos.splice(arreyFotos.indexOf(imgLink), 1)
        } else {
            arreyFotos.push(imgLink)
            document.getElementById(`foto${arreyFotos.length}`).value = imgLink
        }
    }

    function updateImg(imgLink) {
        if (arreyFotosNovas.indexOf(imgLink) == null) {
            arreyFotosNovas.splice(arreyFotosNovas.indexOf(imgLink), 1)
        } else {
            arreyFotosNovas.push(imgLink)
            document.getElementById(`foto${arreyFotosNovas.length}`).value = imgLink
        }
    }

    function idProduto(id) {
        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i]._id == id) {
                document.getElementById("updateNome").setAttribute("value", produtos[i].nomeProduto)
                document.getElementById("updateDescricao").setAttribute("value", produtos[i].descricaoProduto)

                document.getElementById("updatePreco").value = produtos[i].preco
                document.getElementById("updatePedidoMinProduto").value = produtos[i].pedidoMinProduto
                document.getElementById("updateFoto1").value = produtos[i].foto1
                document.getElementById("updateFoto2").value = produtos[i].foto2
                document.getElementById("updateFoto3").value = produtos[i].foto3
            }
        }
    }
    function deletarSabor(id, indice) {
        setId(id)
        setIndiceSabor(indice)
        console.log(id)
        console.log(indice)
        deleteSabor(id, indice)
    }
    function deletarProduto(id) {
        setId(id)
        setIndiceSabor(indice)
        console.log(id)
        console.log(indice)
        deleteSabor(id, indice)
    }
    return (
        <>
            <div className="body-product">

                <div id="insta"></div>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    Inserir Novo Produto
                </button>

                {message && <Message type="success" message={message} />}

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Cadastrando Novo Produto
                                </h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {message && <Message type="success" message={message} />}

                                <Form id="form" content={produtos} btnText="Cadastrar"
                                    classNameButton="btnCadastrar"
                                    onSubmitEvent={createProduto}
                                    onChangeEvent={handleSaboresProduto}
                                />
                            </div>
                        </div>
                    </div>

                </div>



                {
                    produtos.map(number =>

                        <div class="dropdown-center">
                            <button className="btn btn-secondary dropdown-toggle drop" id="dropdownProduto" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {number.nomeProduto}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">SABOR</th>
                                                <th scope="col">PREÇO</th>
                                                <th scope="col">PEDIDO MÍNIMO</th>
                                                <th scope="col">ALTERAR</th>
                                                <th scope="col">EXCLUIR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {


                                                number.sabores.map((sabores, indice) =>

                                                    <tr >
                                                        <td>{sabores.sabor}</td>
                                                        <td>{sabores.preco}</td>
                                                        <td>{number.pedidoMinProduto}</td>

                                                        <td><button type="button" className="btn btn-secondary btnAlterar" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={() => { setIndiceSabor(indice), setId(number._id) }}>
                                                            Alterar
                                                        </button></td>
                                                        <td>

                                                            <button onClick={() => { deletarSabor(number._id, indice) }}>{<BiTrash className="excluir" />}</button>
                                                        </td>

                                                    </tr>

                                                )}


                                            <tr >
                                                <td ><Button type="button" className="btnTrash" buttonClickEvent={() => { deletProduct(number._id) }}>{<BiTrash className="excluir" />}</Button></td>
                                                <td><button type="button" className="btn btn-secondary btnAlterarBaixo" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { setId(number._id), idProduto(number._id) }}>
                                                    Alterar
                                                </button></td>
                                                <td colSpan="2"><button type="button" className="btn btn-secondary btnAdicionar" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => { setId(number._id) }}>
                                                    Adicionar sabor
                                                </button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>

                            </ul>
                        </div>
                    )
                }
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Alterar produto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    {message && <Message type="success" message={message} />}
                                    <form id="form" className={styles.form} onSubmit={updateProduto}>
                                        <label htmlFor="nome">Nome do Produto: </label>
                                        <input type="text" name="updatenome" id="updateNome" />
                                        <label htmlFor="descricao">Descrição do Produto:</label>
                                        <input type="text" name="updatedescricao" id="updateDescricao" />
                                        <label htmlFor="preco">Preço:</label>
                                        <input type="number" name="updatepreco" id="updatePreco" min="0" />
                                        <label htmlFor="pedidoMinimo">Pedido Mínimo:</label>
                                        <input type="text" name="updatepedidominproduto" id="updatePedidoMinProduto" min="0" />
                                        <label htmlFor="foto1">Foto de capa:</label>
                                        <input type="text" name="updatefoto1" id="updateFoto1" />
                                        <label htmlFor="foto2">Segunda foto:</label>
                                        <input type="text" name="updatefoto2" id="updateFoto2" />
                                        <label htmlFor="foto3">Terceira foto:</label>
                                        <input type="text" name="updatefoto3" id="updateFoto3" />
                                        <div id='instasUpdate'></div>
                                        <button type="submit" className="btn btn-warning" id='cadastrar' data-bs-dismiss="modal">Atualizar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Update Sabor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                {message && <Message type="success" message={message} />}
                                <form id="form" className={styles.form} onSubmit={updateSabor}>
                                    <label htmlFor="nome">Sabor: </label>
                                    <input type="text" name="updateSabor" id="updateSabor" />
                                    <label htmlFor="descricao">Preço:</label>
                                    <input type="number" name="updatePrecoSabor" id="updatePrecoSabor" />
                                    <button type="submit" className="btn btn-warning " id='cadastrar' >Atualizar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Adicionar Sabor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                {message && <Message type="success" message={message} />}
                                <form id="form" className={styles.form} onSubmit={createSabor}>
                                    <label htmlFor="nome">Sabor: </label>
                                    <input type="text" name="createSabor" id="createSabor" />
                                    <label htmlFor="descricao">Preço:</label>
                                    <input type="number" name="createPreco" id="createPrecoSabor" />
                                    <button type="submit" className="btn btn-warning " id='cadastrar' >Atualizar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CadastrarProduto
