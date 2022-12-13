import '../css/inventory/Estoque.css'

import Message from '../../components/layout/Message'
import LinkButton from '../../components/layout/LinkButton'
import Dropdown from '../../components/layout/Dropdown'
import Tables from '../../components/inventory/SuppliesTable'
import SearchBar from '../../components/layout/SearchBar'
import Loading from '../../components/layout/Loading'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const url = "http://localhost:3000"

const CadastrarInsumo = () => {

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const [status, setStatus] = useState([])
    const [filterDropdownParams, setFilterDropdownParams] = useState('')
    const [filterSearchParams, setFilterSearchParams] = useState('')
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const location = useLocation()

    // Atualização do status de acordo com a data de validade e quantidade em estoque comparado com a quantidade mínima
    function verifyStatus(supplies) {
        if (supplies.emEstoque <= supplies.quantidadeMin)
            return supplies.status = "Em Falta"

        else if (supplies.validade) {
            const dataValidade = new Date(supplies.validade)
            const dataAtual = new Date()

            var diffDays = diferençaDatasEmDias(dataValidade, dataAtual)

            if (dataValidade < dataAtual)
                return supplies.status = "Vencido"

            else if (diffDays <= 7)
                return supplies.status = "Vencendo"
            else
                return supplies.status = "OK"

        } else
            return supplies.status = "OK"
    }

    // Cálculo da diferença de dias entre duas datas
    function diferençaDatasEmDias(data1, data2) {
        var timeDiff = Math.abs(data1.getTime() - data2.getTime())
        return Math.ceil(timeDiff / (1000 * 3600 * 24))
    }

    // Carregamento dos insumos
    useEffect(() => {
        fetch(`${url}/api/viewAllSupplies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            const initialSupplies = data
            let arrayStatus = []
            let arraySupplies = []

            data.forEach(input => input.status = verifyStatus(input))

            data.map((insumo, index) => {
                arrayStatus.push(updateStatus(insumo, initialSupplies[index].status))
                arraySupplies.push(insumo.categoria)
            })

            arrayStatus = filterDuplicateItemInArray(arrayStatus)
            arraySupplies = filterDuplicateItemInArray(arraySupplies)

            setInsumos(data)
            setCategories(arraySupplies.sort())
            setStatus(arrayStatus.sort())
        })
        .catch(err => console.error(err))

        if (location.state) {
            setTypeMessage(location.state.type)
            setMessage(location.state.message)
            setShowMessage(true)
        }

        setTimeout(() => setIsLoading(false), 600)
    }, [])

    // Atualizar o status no bd toda vez q página é carregada e o status calculado
    function updateStatus(insumo, status) {
        if (insumo.status != status)
            fetch(`${url}/api/updateInput?id=${insumo._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "status": insumo.status }),
            }).catch(err => console.error(err))

        return insumo.status
    }

    // Identificar a linha da tabela clicada
    function idTrClicada(e) {
        const tr = e.target
        var element = tr.parentNode
        while(element.id == false)
            element = element.parentNode

        return element.id
    }

    // Delete de insumos
    function deleteInput(e) {
        e.preventDefault()
        console.log(idTrClicada(e))
        const id = idTrClicada(e)

        fetch(`${url}/api/deleteInput?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
            .then(() => {
                setInsumos(insumos.filter(insumo => insumo._id !== id))
                setTypeMessage("success")
                setMessage("Insumo removido com sucesso!")
                setShowMessage(true)
            })
            .catch(() => {
                setTypeMessage("error")
                setMessage("Houve um erro ao remover o insumo")
                setShowMessage(true)
            })
    }

    // Filtro de elementos repetidos para o array de categorias
    function filterDuplicateItemInArray(array) {
        var filteredArray = array.filter((item, index) => {
            return array.indexOf(item) === index
        })

        return filteredArray
    }

    // Filtro do insumos de acordo com o status
    function handleFilterSuppliesByStatus(e) {
        const value = e.target.value
        setFilterDropdownParams(value)
    }

    // Filtro dos insumos de acordo com o nome
    function handleFilterSuppliesByName(e) {
        const value = e.target.value
        setFilterSearchParams(value)
    }

    return (
        <div className="body-inventory">
            <div className="titleButton">
                <h1 className="inventory-title">Cadastro de Insumos</h1>

                <LinkButton to="/adm/cadastrarInsumo" state={{ categories: categories }} classNameButton="btnAdd">
                    Inserir Novo Insumo
                </LinkButton>
            </div>

            { showMessage && <Message type={typeMessage} message={message} showMessage={setShowMessage}/>}

            <div className="filters">
                <SearchBar handleOnChange={handleFilterSuppliesByName} placeholder="Pesquise por um Insumo" />

                <Dropdown options={status}
                    textDefault="Selecione um status"
                    handleOnChange={handleFilterSuppliesByStatus}
                    notSwitchValue />
            </div>
                {isLoading ?
                    <Loading />
                    :
                    <Tables
                        itens={insumos}
                        filterDropdownParams={filterDropdownParams}
                        filterSearchParams={filterSearchParams}
                        categorias={categories}
                        buttonClickEvent={deleteInput}
                    />
                }
        </div>
    )
}
export default CadastrarInsumo