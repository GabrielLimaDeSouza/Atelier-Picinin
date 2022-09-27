import Button from "../layout/Button"
import LinkButton from "../layout/LinkButton"
import Dropdown from "../layout/Dropdown"

import { useEffect, useState } from "react"

const FormAddress = ({ handleSubmit, value }) => {
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
        <form onSubmit={submit}>
            <div className="ruaCEP">
                <div className="rua">
                    <label htmlFor="rua">Endereco</label>
                    <input type="text" name="rua" id="rua" onChange={handleChange} required/>
                </div>

                <div className="cep">
                    <label htmlFor="cep">CEP</label>
                    <input type="number" name="cep" id="cep" onChange={handleChange} required/>
                </div>
            </div>

            <div className="bairroCidade">
                <div className="bairro">
                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" name="bairro" id="bairro" onChange={handleChange} required/>
                </div>

                <div className="cidade">
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" name="cidade" id="cidade" onChange={handleChange} required/>
                </div>
            </div>

            <div className="complementoNumero">
                <div className="complemento">
                    <label htmlFor="complemento">Complemento (opcional)</label>
                    <input type="text" name="complemento" id="complemento" onChange={handleChange}/>
                </div>

                <div className="endereco">
                    <label htmlFor="numero">Número</label>
                    <input type="number" name="numero" id="numero" onChange={handleChange} required/>
                </div>
            </div>

            <Dropdown options={estados.sort()}
                textDefault="Selecione um Estado"
                handleOnChange={handleChange}
                allowLabel
                label="UF"
                name="estado"
                notSwitchValue />

            <div className="hudBtns">
                <LinkButton to="/carrinho" classNameButton="btnBack">Voltar</LinkButton>

                
                <Button
                    type="submit"
                    className="btnCastrar"
                    buttonSubmitEvent={submit}>
                    Salvar Endereço
                </Button>
            </div>
        </form>
    )
}

export default FormAddress