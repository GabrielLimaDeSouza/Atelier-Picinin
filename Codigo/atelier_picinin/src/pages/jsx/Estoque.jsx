import '../css/Estoque.css'

import Cabecalho from '../../components/CabecalhoAdmin'
import Message from '../../components/Message'
import LinkButton from '../../components/LinkButton'
import Dropdown from '../../components/Dropdown'
import Tables from '../../components/SuppliesTable'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CadastrarInsumo = () => {
    const [message, setMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const [status, setStatus] = useState([])
    const [filterParams, setFilterParams] = useState('')
    const [inputTypes, setInputTypes] = useState([])
    const [initialSupplies, setInitialSupplies] = useState([])
    const [initialInuputTypes, setInitialInuputTypes] = useState([])
    const location = useLocation()

    if(location.state)
        setMessage(location.state.message)

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
            setInitialSupplies(data)
            setInputTypes(arraySupplies)
            setInitialInuputTypes(arraySupplies)
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
        setFilterParams(value)
        
        /* let teste = []
        initialSupplies.forEach((insumo, index) => {
            if(insumo.status != value){
                setInsumos(insumos.filter(input => input.status == value))
            } else{
                insumos.push(initialSupplies[index])
                teste.push(initialSupplies[index])
                setInsumos(array => [...array])
            }
        })

        console.log(teste)
        if(teste)
            teste.forEach(insumo => {
                console.log(inputTypes.includes(insumo.name))
                console.log(insumo);
                if(inputTypes.includes(insumo.name)){
                    // inputTypes.push(initialInuputTypes[index])
                    // setInputTypes(array => [...array])
                    //console.log(inputTypes)
                } else {
                    setInputTypes(inputTypes.splice(inputTypes[insumo.name], 1))
                    console.log(inputTypes)
                }
            })
        else
            setInputTypes([]) */
    }
    
    return (
        <>
            <Cabecalho />
            <div className="body-inventory">
                <div className="titleButton">
                    <h1 className="title">Cadastro de Insumos</h1>

                    <LinkButton to="/cadastrarInsumo" text="Inserir Novo Insumo" classNameButton="btnAdd"/>
                </div>

                { message && <Message type="success" message={message} /> }

                <div className="filters">
                    <Dropdown options={status} textDefault="Selecione um status" handleOnChange={handleFilterSuppliesByStatus} />
                </div>

                <Tables
                    itens={insumos}
                    filterParams={filterParams}
                    categorias={inputTypes}
                    buttonClickEvent={deleteInput}
                />
            </div>
        </>
    )
}
export default CadastrarInsumo