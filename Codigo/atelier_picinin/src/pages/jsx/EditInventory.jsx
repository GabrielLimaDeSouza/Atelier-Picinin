import '../css/EditInventory.css'

import Form from '../../components/FormCadastroInsumos'
import Button from '../../components/Button'
import LinkButton from '../../components/LinkButton'
import Supplies from '../../components/Supplies'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditInvetory = () => {
    const { id } = useParams()
    const [insumo, setInsumo] = useState({})
    const [editingInput, setEditingInput] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/api/viewInputById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            setInsumo(data)
            insumo.emEstoque = parseInt(insumo.emEstoque)
            insumo.quantidadeMin = parseInt(insumo.quantidadeMin)
        })
        .catch(err => console.error(err))
    }, [])

    function toggleInputForm(){
        setEditingInput(!editingInput)
    }

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
        .then(data => {
            setInsumo(data)
            setEditingInput(false)
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            { insumo && (
                <>
                    <h2 className="title">Editar {insumo.name}</h2>
                    
                    <Button type="button"
                        text={!editingInput ? 'Editar Insumo' : 'Fechar'}
                        className="btnBack"
                        buttonClickEvent={toggleInputForm}
                    /> 
                        
                    { message && <Message type="success" message={message} /> }

                    { !editingInput ? (
                        <Supplies content={insumo} />
                    ) : (
                        <Form id="form"
                            content={insumo}
                            handleSubmit={handleEditInput}
                            btnText="Alterar"
                            classNameButton="btnCadastrar"
                        />
                    )}
                    <LinkButton to="/estoque" text="Voltar" classNameButton="btnBack"/>
                </>
            )}
        </>
    )
}

export default EditInvetory