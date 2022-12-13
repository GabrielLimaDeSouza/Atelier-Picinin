import '../css/Products/CadastrarProduto.css'
import styles from '../../components/css_components/Form.module.css'

import Form from "../../components/products/FormCadastroProdutos"
import Button from "../../components/layout/Button"
import Message from "../../components/layout/Message"

import { useState, useEffect } from "react"
import { BiTrash } from "react-icons/bi"

var sabores = []
var lenghtSabor = 0

const CadastrarProduto = () => {
    const [produtos, setProdutos] = useState([])
    const [arrayFotos, setArrayFotos] = useState([])
    const [arrayFotosUpdate, setArrayFotosUpdate] = useState([])
    const [sabor, setSabor] = useState([])
    const [id, setId] = useState({})
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [indiceSabor, setIndiceSabor] = useState('')

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
    var controle = 0

    useEffect(() => {
        const token = "IGQVJYb192MUJ3ZAmExTUp4bnlMRWRZAUVNKV3dnWjRwSk0zbHZACUXRpUF84N3M5MVJTR1hoUUhBZA3dGZAURZASmNySEpvVXd1dUdyV0ZAYRmY0RlVmempGdmZAxRkpnUnhxRU16UkJvVkZAod0JVRVhSWmU4OAZDZD"
        const urlInsta = "https://graph.instagram.com/me/media?access_token=" + token + "&fields=media_url,media_type,caption,permalink"

        fetch(urlInsta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => {

                let controle2 = 0;
                if (controle == 0) {
                    dadosJson = data.data
                    for (let i = 0; i < dadosJson.length && controle2 <= 11; i++) {
                        if (dadosJson[i].media_type == "IMAGE") {
                            var feed = dadosJson[i]
                            if (document.getElementById("div" + i) != null) {
                                var node = document.getElementById("div" + i);
                                if (node.parentNode) {
                                    node.parentNode.removeChild(node);
                                }
                            }



                            var oImg = document.createElement("img")
                            var div = document.createElement("div")
                            div.id = "div" + i
                            div.className = "componente " + feed.media_url
                            oImg.setAttribute("src", feed.media_url)
                            oImg.setAttribute("alt", "na")
                            oImg.setAttribute("height", "100px")
                            oImg.setAttribute("width", "100px")
                            oImg.addEventListener("click", salvaImg.bind(null, feed.media_url, i))
                            div.appendChild(oImg)
                            document.getElementById("instas").appendChild(div)

                            var oImg = document.createElement("img")

                            var oImg = document.createElement("img")
                            var div = document.createElement("div2")
                            div.id = "div2" + i
                            div.className = "componenteUpdate " + feed.media_url
                            oImg.setAttribute("src", feed.media_url)
                            oImg.setAttribute("alt", "na")
                            oImg.setAttribute("height", "100px")
                            oImg.setAttribute("width", "100px")
                            oImg.addEventListener("click", salvaImgUpdate.bind(null, feed.media_url, i))
                            div.appendChild(oImg)
                            document.getElementById("instasUpdate").appendChild(div)

                            var oImg = document.createElement("img")

                            controle2++;
                        }
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
        } else {
            lenghtSabor = 0
        }
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
        }).then(() => {
            setMessage("Produto cadastrado com sucesso!")
            setTypeMessage("success")
            setShowMessage(true)
        })
            .catch(() => {
                setMessage("Houve um erro ao cadastrar um novo produto")
                setTypeMessage("error")
                setShowMessage(true)
            })
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
        }).then(() => {
            setMessage("Produto atualizado com sucesso!")
            setTypeMessage("success")
            setShowMessage(true)
        })
            .catch(() => {
                setMessage("Houve um erro ao atualizar o produto")
                setTypeMessage("error")
                setShowMessage(true)
            })

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
        }).then(() => {
            setMessage("Sabor atualizado com sucesso!")
            setTypeMessage("success")
            setShowMessage(true)
        })
            .catch(() => {
                setMessage("Houve um erro ao atualizar o sabor")
                setTypeMessage("error")
                setShowMessage(true)
            })
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
        }).then(() => {
            setMessage("Sabor criado com sucesso!")
            setTypeMessage("success")
            setShowMessage(true)
        })
            .catch(() => {
                setMessage("Houve um erro ao criar um novo sabor")
                setTypeMessage("error")
                setShowMessage(true)
            })


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
                setTypeMessage("success")
                setShowMessage(true)
            })
            .catch(() => {
                setMessage("Houve um erro ao remover o produto")
                setTypeMessage("error")
                setShowMessage(true)
            })
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
                setTypeMessage("success")
                setShowMessage(true)
            })
            .catch(() => {
                setMessage("Houve um erro ao remover o sabor")
                setTypeMessage("error")
                setShowMessage(true)
            })
    }
    function salvaImg(imgLink, i) {
        let clicada = document.getElementById("div" + i)
        if (arrayFotos.includes(imgLink)) {
            clicada.className = "componente"
            arrayFotos.splice(arrayFotos.indexOf(imgLink), 1)
            if (document.getElementById(`foto1`).value == imgLink) {
                document.getElementById(`foto1`).value = ""
            }
            if (document.getElementById(`foto2`).value == imgLink) {
                document.getElementById(`foto2`).value = ""
            }
            if (document.getElementById(`foto3`).value == imgLink) {
                document.getElementById(`foto3`).value = ""
            }
        } else {
            if (arrayFotos.length <= 2) {
                arrayFotos.push(imgLink)
                clicada.className = "componenteSelecionado"
                if (document.getElementById(`foto1`).value == "") {
                    console.log("foto1")
                    document.getElementById(`foto1`).value = imgLink
                } else {
                    if (document.getElementById(`foto2`).value == "") {
                        console.log("foto2")
                        document.getElementById(`foto2`).value = imgLink
                    }
                    else
                        if (document.getElementById(`foto3`).value == "") {
                            console.log("foto3")
                            document.getElementById(`foto3`).value = imgLink
                        }
                }


            }

        }

    }
    function salvaImgUpdate(imgLink, i) {
        let clicada = document.getElementById("div2" + i)
        if (arrayFotosUpdate.includes(imgLink)) {
            
            arrayFotosUpdate.splice(arrayFotosUpdate.indexOf(imgLink), 1)
            if (document.getElementById(`updateFoto1`).value == imgLink) {
                clicada.className = "componenteUpdate " + imgLink
                document.getElementById(`updateFoto1`).value = ""
            }
            if (document.getElementById(`updateFoto2`).value == imgLink) {
                clicada.className = "componenteUpdate " + imgLink
                document.getElementById(`updateFoto2`).value = ""
            }
            if (document.getElementById(`updateFoto3`).value == imgLink) {
                clicada.className = "componenteUpdate " + imgLink
                document.getElementById(`updateFoto3`).value = ""
            }
        } else {
            if (arrayFotosUpdate.length <= 2) {
                arrayFotosUpdate.push(imgLink)
                clicada.className = "componenteUpdateSelecionado"
                if (document.getElementById(`updateFoto1`).value == "") {
                    console.log("updateFoto1")
                    clicada.className = "componenteUpdateSelecionado " + imgLink
                    document.getElementById(`updateFoto1`).value = imgLink
                } else {
                    if (document.getElementById(`updateFoto2`).value == "") {
                        console.log("updateFoto2")
                        clicada.className = "componenteUpdateSelecionado " + imgLink
                        document.getElementById(`updateFoto2`).value = imgLink
                    }
                    else
                        if (document.getElementById(`updateFoto3`).value == "") {
                            console.log("updateFoto3")
                            clicada.className = "componenteUpdateSelecionado " + imgLink
                            document.getElementById(`updateFoto3`).value = imgLink
                        }
                }


            }

        }
    }

    function idProduto(id) {
        console.log(dadosJson)
        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i]._id == id) {
                document.getElementById("updateNome").setAttribute("value", produtos[i].nomeProduto)
                document.getElementById("updateDescricao").setAttribute("value", produtos[i].descricaoProduto)
                document.getElementById("updatePreco").value = produtos[i].preco
                document.getElementById("updatePedidoMinProduto").value = produtos[i].pedidoMinProduto
                document.getElementById("updateFoto1").value = ""
                document.getElementById("updateFoto2").value = ""
                document.getElementById("updateFoto3").value = ""

                arrayFotosUpdate.forEach(selecionado =>{
                    let divs = document.getElementsByClassName("componenteUpdateSelecionado")
                    console.log(divs)
                    for(let j=0; j<divs.length; j++){
                        divs[j].className = "componenteUpdate " + selecionado
                    }
                    }
                    )
                
                    
                
                
            }
        }
    }
    function deletarSabor(id, indice) {
        setId(id)
        setIndiceSabor(indice)
        deleteSabor(id, indice)
    }
    function deletarProduto(id) {
        setId(id)
        setIndiceSabor(indice)
        deleteSabor(id, indice)
    }
    return (
        <>
            <div className="body-product">



                <button type="button" className="btn btn-primary btnEstilo" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    Inserir Novo Produto
                </button>

                {showMessage && <Message type={typeMessage} message={message} showMessage={setShowMessage} />}

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

                                                        <td> <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { setIndiceSabor(indice), setId(number._id) }}>
                                                            Alterar</button>
                                                        </td>
                                                        
                                                        <td>
                                                            <button onClick={() => { deletarSabor(number._id, indice) }}>{<BiTrash className="excluir" />}</button>
                                                        </td>

                                                    </tr>

                                                )}


                                            <tr >
                                                <td ><Button type="button" className="btnTrash" buttonClickEvent={() => { deletProduct(number._id) }}>{<BiTrash className="excluir" />}</Button></td>
                                                <td><button type="button" className="btn btn-secondary btnAlterar" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => { setId(number._id), idProduto(number._id) }}>
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

                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Alterando sabor
                                </h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
            </div>
            
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Alterando prouto
                                </h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
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
                                        <div id='instasUpdate' className='instasUpdate'></div>
                                        <button type="submit" className="btn btn-warning" id='cadastrar' data-bs-dismiss="modal">Atualizar</button>
                                    </form>
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
                                            <button type="submit" className="btn btn-warning " id='cadastrar' >Adicionar sabor</button>
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
