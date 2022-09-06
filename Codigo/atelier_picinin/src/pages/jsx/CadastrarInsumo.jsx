import '../css/CadastrarInsumo.css'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import Tables from '../../components/TableInsumos'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/ModalInsumos'

const CadastrarInsumo = () => {
    function deleteProduct(e){
        const btn = e.target
        var element = btn.parentNode
        while(element.id == false)
            element = element.parentNode
    }

    

    const [insumos, setInsumos] = useState([])

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
    return (
        <div className="body">
            <h1 className="title">Cadastro de Insumos</h1>
            <Button type="button" text="Inserir Novo Insumo" data_bs_toggle="modal" data_bs_target="#modalCadastro" className=""/>
            <Modal id="modalCadastro"/>
            <Tables 
                itens={insumos}
                textButton={
                    <Button type="button" text={<BiTrash />}
                    className="btnLixeira"
                    event={deleteProduct} />
                    }
            />
            {/* <table>
                <thead>
                    <td><span>INSUMO</span></td>
                    <td><span>QUANTIDADE</span></td>
                    <td><span>VALIDADE</span></td>
                    <td><span>STATUS</span></td>
                    <td><span></span></td>
                </thead>
                <tbody>
                    <tr>
                        <td>Farinha 1k</td>
                        <td>0</td>
                        <td>N/P</td>
                        <td className="status-em-falta">EM FALTA</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                    <tr>
                        <td>Açucar 1k</td>
                        <td>4</td>
                        <td>04/05/2022</td>
                        <td className="status-vencido">VENCIDO</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                    <tr>
                        <td>Chocolate barra</td>
                        <td>7</td>
                        <td>07/09/2022</td>
                        <td className="status-vencendo">VENCENDO</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                    <tr>
                        <td>Palitos pacote</td>
                        <td>2</td>
                        <td>N/P</td>
                        <td className="status-ok">OK</td>
                        <td><button className='btnLixeira'><BiTrash /></button></td>
                    </tr>
                </tbody>
            </table> */}
        </div>


    )
}
export default CadastrarInsumo