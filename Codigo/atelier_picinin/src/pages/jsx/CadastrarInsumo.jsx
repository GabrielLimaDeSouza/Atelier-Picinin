import '../css/CadastrarInsumo.css'

import { BiTrash } from 'react-icons/bi'
import Tables from '../../components/TableInsumos'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/ModalInsumos'
import React from 'react'

const CadastrarInsumo = () => {
    const [message, setMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const [insumo, setInsumo] = useState({})

    function deleteInventory(e){
        e.preventDefault();
        const btn = e.target
        var element = btn.parentNode
        while(element.id == false)
            element = element.parentNode
        
        fetch(`http://localhost:3000/api/deleteInventory?id=${element.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setInsumos(insumos.filter((insumo) => insumo.id !== id))
            setMessage("Insumo removido com sucesso!")
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/viewAllInventory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => setInsumos(data))
        .catch(err => console.error(err))
    })

    function trClicada(e) {
        const tr = e.target
        var element = tr.parentNode
        while(element.id == false)
            element = element.parentNode

        setInsumo(insumos.find(insumo => insumo._id === element.id))
    }

    function handleSubmit(e){
        e.preventDefault()
        setMessage("Insumo cadastrado com sucesso!")
    }

    return (
        <div className="body">
            <h1 className="title">Cadastro de Insumos</h1>
            <Button type="button" text="Inserir Novo Insumo" data_bs_toggle="modal" data_bs_target="#modalCadastro" className=""/>
            
            <p>{message}</p>

            <Modal id="modalCadastro" title="Cadastrar novo Insumo" action="http://localhost:3000/api/inventoryResgister" onSubmitEvent={handleSubmit}/>

            <Tables 
                itens={insumos}
                textButton={
                    <Button type="button" text={<BiTrash />}
                    className="btnLixeira"
                    event={deleteInventory} />
                }
                trClicada={trClicada}
                data_bs_target="#modalUpdate"
            />
        </div>
    )
}
export default CadastrarInsumo