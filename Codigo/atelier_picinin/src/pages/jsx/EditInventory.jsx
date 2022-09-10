import '../css/EditInventory.css'

import Form from '../../components/FormCadastroInsumos'
import LinkButton from '../../components/LinkButton'
import Cabecalho from '../../components/CabecalhoAdmin'
import Message from '../../components/Message'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditInvetory = () => {
    const { id } = useParams()
    const [insumo, setInsumo] = useState({})
    const [message, setMessage] = useState('')

    useEffect(() => {
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
    }, [])

    function handleEditInput(editedInput){
        if(editedInput.emEstoque < editedInput.quantidadeMin){
            setMessage("Quantidade Inicial deve ser maior que a Quantidade Mínima")
            return false
        }

        fetch(`http://localhost:3000/api/updateInput?id=${editedInput._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;',
            },
            body: JSON.stringify(editedInput),
        }).then(resp => resp.json())
        .then(data => setInsumo(data))
        .catch(err => console.error(err))
    }

    return (
        <>
            <Cabecalho />
            <div className="body-edit-inventory">
                <h1 className="title">Editar {insumo.name}</h1>
                        
                { message && <Message type="success" message={message} /> }
                
                { insumo && 
                    <Form id="form"
                        content={insumo}
                        handleSubmit={handleEditInput}
                        btnText="Alterar"
                        classNameButton="btnCadastrar"
                    />
                }
                <LinkButton to="/estoque" text="Voltar" classNameButton="btnBack"/>
            </div>
        </>
    )
}

export default EditInvetory