import '../css/CadastrarInsumo.css'

import { useState, useEffect } from 'react'
import Tables from '../../components/TableInsumos'
import Modal from '../../components/Modal'
import Form from '../../components/FormCadastroInsumos'
import Button from '../../components/Button'


const CadastrarInsumo = () => {
    const [message, setMessage] = useState('')
    const [insumos, setInsumos] = useState([])
    const [form, setForm] = useState('')

    function deleteInventory(e){
        e.preventDefault()
        idTrClicada(e)
        
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

        setForm(<Form id="form"
                    action="http://localhost:3000/api/inventoryResgister"
                    btnText="Cadastrar"
                    classNameButton="btnCadastrar"
                    linkButton="estoque"
                />
        )
    }, [])

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

                { message && ( <p>{message}</p> ) }

                <Button type="button" text="Inserir Novo Insumo" data_bs_toggle="modal" data_bs_target="#modalCadastro" className="btnAdd"/>
            </div>

            <Modal id="modalCadastro" title="Cadastrar novo Insumo" content={form}/>

            <Tables 
                itens={insumos}
                form={form}
                deleteInventory={deleteInventory}
                buttonEvent={deleteInventory}
            />
        </div>
    )
}
export default CadastrarInsumo