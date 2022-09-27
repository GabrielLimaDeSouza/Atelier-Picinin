import '../css/inventory/EditInventory.css'

import Form from '../../components/inventory/FormCadastroInsumos'
import Cabecalho from '../../components/layout/CabecalhoAdmin'
import Message from '../../components/layout/Message'
import Loading from '../../components/layout/Loading'

import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const EditInvetory = () => {
    const { id } = useParams()
    const [insumo, setInsumo] = useState({})
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3000/api/viewInputById?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
            .then(data => {
                data.emEstoque = parseInt(data.emEstoque)
                data.quantidadeMin = parseInt(data.quantidadeMin)
                setInsumo(data)
            })
            .catch(err => console.error(err))
    
            setCategories(location.state.categories)
            setIsLoading(false)
        }, 1200)
    }, [])

    function handleEditInput(editedInput){
        if(editedInput.emEstoque < 0 && editedInput.quantidadeMin < 0){
            setMessage("Valores invalidos")
            setTypeMessage("error")
            return false
        }

        fetch(`http://localhost:3000/api/updateInput?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedInput)
        }).then(resp => resp.json())
        .then(navigate('/estoque', { state: { message: "Insumo atualizado com sucesso!", type: "success" } }))
        .catch(err => console.error(err))
    }

    return (
        <>
            <Cabecalho />
            <div className="body-edit-inventory">
                <h1 className="edit-title">Editar insumo</h1>

                { message && <Message type={typeMessage} message={message} /> }
                
                { isLoading ?
                    <Loading />
                    :
                    <Form id="form"
                        content={insumo}
                        handleSubmit={handleEditInput}
                        btnText="Alterar"
                        classNameButton="btnCadastrar"
                        selectOptions={categories}
                        selectTextDefault="Selecione uma categoria"
                        btnVoltar="/estoque"
                    />
                    
                }
            </div>
        </>
    )
}

export default EditInvetory