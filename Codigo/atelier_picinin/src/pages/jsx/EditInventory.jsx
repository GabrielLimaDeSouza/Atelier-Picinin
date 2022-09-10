import '../css/EditInventory.css'

import Form from '../../components/FormCadastroInsumos'
import LinkButton from '../../components/LinkButton'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditInvetory = () => {
    const { id } = useParams()
    const [insumo, setInsumo] = useState({})
    const [insumoCarregado, setInsumoCarregado] = useState(false)
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

            setInsumoCarregado(true)
        })
        .catch(err => console.error(err))
    }, [])

    function editInput(editedInput){
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
            { insumoCarregado && (
                <>
                    <h2 className="title">Editar Insumo</h2>

                    { message && <Message type="success" message={message} /> }

                    <Form id="form"
                        content={insumo}
                        handleSubmit={editInput}
                        btnText="Alterar"
                        classNameButton="btnCadastrar"
                    />
                    
                    <LinkButton to="/estoque" text="Voltar" classNameButton="btnBack"/>
                </>
            )}  
        </>
    )
}

export default EditInvetory