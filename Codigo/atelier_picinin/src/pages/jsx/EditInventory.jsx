import '../css/inventory/EditInventory.css'

import Form from '../../components/inventory/FormCadastroInsumos'
import Message from '../../components/layout/Message'
import Loading from '../../components/layout/Loading'

import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const url = "http://localhost:3000"

const EditInvetory = () => {
    const { id } = useParams()
    const [insumo, setInsumo] = useState({})
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setTimeout(() => {
            fetch(`${url}/api/viewInputById?id=${id}`, {
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
            setShowMessage(true)
            return false
        }

        fetch(`${url}/api/updateInput?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedInput)
        }).then(resp => resp.json())
        .then(navigate('/estoque', { state: { message: "Insumo atualizado com sucesso!", type: "success" } }))
        .catch(() => {
            setTypeMessage("error")
            setMessage("Houve um erro atualizar o insumo")
            setShowMessage(true)
        })
    }

    return (
        <div className="body-edit-inventory">
            <h1 className="edit-title">Editar insumo</h1>

            { showMessage && <Message type={typeMessage} message={message} showMessage={setShowMessage} /> }
            
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
                    btnVoltar="/adm/estoque"
                />
                
            }
        </div>
    )
}

export default EditInvetory