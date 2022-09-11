import '../css/Estoque.css'

import Cabecalho from '../../components/CabecalhoAdmin'
import Message from '../../components/Message'
import LinkButton from '../../components/LinkButton'
import Dropdown from '../../components/Dropdown'
import Tables from '../../components/SuppliesTable'
import SearchBar from '../../components/SearchBar'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CadastrarInsumo = () => {
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const [status, setStatus] = useState([])
    const [filterDropdownParams, setFilterDropdownParams] = useState('')
    const [filterSearchParams, setFilterSearchParams] = useState('')
    const [inputTypes, setInputTypes] = useState([])
    
    const location = useLocation()

    // Carregamento dos insumos
    useEffect(() => {
        fetch('http://localhost:3000/api/viewAllSupplies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            let arrayStatus = ["fodase"]
            let arraySupplies = []
            
            data.map(data => {
                arrayStatus.push(data.status)
                arraySupplies.push(data.name)
            })
            
            arrayStatus = filterDuplicateItemInArray(arrayStatus)
            arraySupplies = filterDuplicateItemInArray(arraySupplies)

            
            setInsumos(data)
            setInputTypes(arraySupplies)
            setStatus(arrayStatus)
        })
        .catch(err => console.error(err))

        if(location.state) {
            setTypeMessage(location.state.type)
            setMessage(location.state.message)
        }
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
            setTypeMessage("success")
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
        var filteredArray = array.filter((item, index) => {
            return array.indexOf(item) === index;
        });

        return filteredArray
    }

    function handleFilterSuppliesByStatus(e){
        const value = e.target.value
        setFilterDropdownParams(value)
    }
    
    function handleFilterSuppliesByName(e){
        const value = e.target.value
        setFilterSearchParams(value)
    }
    
    return (
        <>
            <Cabecalho />
            <div className="body-inventory">
                <div className="titleButton">
                    <h1 className="title">Cadastro de Insumos</h1>

                    <LinkButton to="/cadastrarInsumo" text="Inserir Novo Insumo" classNameButton="btnAdd"/>
                </div>

                { message && <Message type={typeMessage} message={message} /> }

                <div className="filters">
                    <SearchBar handleOnChange={handleFilterSuppliesByName}/>
                    <Dropdown options={status} textDefault="Selecione um status" handleOnChange={handleFilterSuppliesByStatus} />
                </div>

                <Tables
                    itens={insumos}
                    filterDropdownParams={filterDropdownParams}
                    filterSearchParams={filterSearchParams}
                    categorias={inputTypes}
                    buttonClickEvent={deleteInput}
                />
            </div>
        </>
    )
}
export default CadastrarInsumo