import '../css/Estoque.css'

import Tables from '../../components/SuppliesTable'
import LinkButton from '../../components/LinkButton'
import Message from '../../components/Message'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CadastrarInsumo = () => {
    const [message, setMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const location = useLocation();

    if(location.state){
        setMessage(location.state.message)
    }

    // Carregamento dos insumos
    useEffect(() => {
        fetch('http://localhost:3000/api/viewAllSupplies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setInsumos(data))
        .catch(err => console.error(err))
    }, [])

    // Delete de insumos
    function deleteInput(e){
        e.preventDefault()
        const id = idTrClicada(e)
        
        fetch(`http://localhost:3000/api/deleteInput?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setInsumos(insumos.filter(insumo => insumo._id !== id))
            console.log(insumos)
            setMessage("Insumo removido com sucesso!")
        })
        .catch(err => console.error(err))
    }

    // Identificar a linha da tabela clicada
    function idTrClicada(e) {
        const tr = e.target
        var element = tr.parentNode
        while(element.id == false)
            element = element.parentNode

        return element.id
    }
    
    return (
        <div className="body">
            <div className="titleButton">
                <h1 className="title">Cadastro de Insumos</h1>

                <LinkButton to="/cadastrarInsumo" text="Inserir Novo Insumo" classNameButton="btnAdd"/>
            </div>

            { message && <Message type="success" message={message} /> }

            <Tables 
                itens={insumos}
                deleteInput={deleteInput}
            />
        </div>
    )
}
export default CadastrarInsumo