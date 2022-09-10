import '../css/Estoque.css'

import Tables from '../../components/SuppliesTable'
import LinkButton from '../../components/LinkButton'
import Message from '../../components/Message'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Dropdown from '../../components/Dropdown'

const CadastrarInsumo = () => {
    const [message, setMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const [status, setStatus] = useState([])
    const [inputTypes, setInputTypes] = useState([])
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
        .then(data => {
            setInsumos(data)

            let arrayStatus = []
            let arraySupplies = []
            
            data.map(data => {
                arrayStatus.push(data.status)
                arraySupplies.push(data.name)
            })

            arrayStatus = filterDuplicateItemInArray(arrayStatus)
            arraySupplies = filterDuplicateItemInArray(arraySupplies)

            setInputTypes(arraySupplies)

            setStatus(arrayStatus)
        })
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

    function filterDuplicateItemInArray(array){
        var newArray = array.filter((item, index) => {
            return array.indexOf(item) === index;
        });

        return newArray
    }
    
    return (
        <div className="body">
            <div className="titleButton">
                <h1 className="title">Cadastro de Insumos</h1>

                <LinkButton to="/cadastrarInsumo" text="Inserir Novo Insumo" classNameButton="btnAdd"/>
            </div>

            { message && <Message type="success" message={message} /> }

            <div className="filters">
                <Dropdown options={status} textDefault="Selecione um status" />
            </div>

            <Tables
                itens={insumos}
                categorias={inputTypes}
                buttonClickEvent={deleteInput}
            />
        </div>
    )
}
export default CadastrarInsumo