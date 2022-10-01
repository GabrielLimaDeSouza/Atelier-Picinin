import '../css/FormAddress.css'

import Button from "../../layout/Button"
import LinkButton from "../../layout/LinkButton"
import Input from "../../layout/Inputs"
import Dropdown from "../../layout/Dropdown"

import { useEffect, useState } from "react"

const FormAddress = ({ handleSubmit, value, linkButton }) => {
    const estados = [ "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
    "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO" ]

    const [address, setAddress] = useState({})

    useEffect(() => {
        if(value)
            setAddress(value)
        else
            setAddress({})
    }, [value])

    function objetoVazio(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)){
                return false
            }
        }

        return true;
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('input')
        const select = document.querySelector('select#select')

        if(objetoVazio(address)) {
            inputs.forEach(input => input.value = "")
            select.value = ""
        } else {
            inputs.forEach(input => input.value = address[input.name])
            select.value = address.estado
        }
    }, [address])
    
    function handleChange(e) {
        address[e.target.name] = e.target.value
        setAddress(address)
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(address)
    }

    return (
        <form className="form" onSubmit={ submit }>
            <div className="ruaCEP">
                <div className="rua">
                    <Input type="text"
                        name="rua"
                        id="rua"
                        onChange={ handleChange }
                        htmlFor="rua"
                        textLabel="Endereco"
                        required/>
                </div>

                <div className="cep">
                    <Input type="number"
                        name="cep"
                        id="cep"
                        onChange={ handleChange }
                        htmlFor="cep"
                        textLabel="CEP"
                        required/>
                </div>
            </div>

            <div className="bairroCidade">
                <div className="bairro">
                    <Input type="text"
                        name="bairro"
                        id="bairro"
                        onChange={ handleChange }
                        htmlFor="bairro"
                        textLabel="Bairro"
                        required/>
                </div>

                <div className="cidade">
                    <Input type="text"
                        name="cidade"
                        id="cidade"
                        onChange={ handleChange }
                        htmlFor="cidade"
                        textLabel="Cidade"
                        required/>
                </div>
            </div>

            <div className="complementoNumero">
                <div className="complemento">
                    <Input type="text"
                        name="complemento"
                        id="complemento"
                        htmlFor="complemento"
                        textLabel="Complemento (opcional)"
                        onChange={ handleChange }/>
                </div>

                <div className="numero">
                    <Input type="number"
                        name="numero"
                        id="numero"
                        onChange={ handleChange }
                        htmlFor="numero"
                        textLabel="Número"
                        required/>
                </div>
            </div>

            <Dropdown options={ estados.sort() }
                textDefault="Selecione um Estado"
                handleOnChange={ handleChange }
                allowLabel
                label="UF"
                name="estado"
                notSwitchValue />

            <div className="hudBtns">
                { linkButton && <LinkButton to="/carrinho" classNameButton="btnBack">Voltar</LinkButton> }

                
                <Button
                    type="submit"
                    className="btnAdd"
                    buttonSubmitEvent={submit}>
                    Salvar Endereço
                </Button>
            </div>
        </form>
    )
}

export default FormAddress