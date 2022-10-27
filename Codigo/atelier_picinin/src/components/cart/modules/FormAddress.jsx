import '../css/FormAddress.css'

import Button from "../../layout/Button"
import LinkButton from "../../layout/LinkButton"
import Input from "../../layout/Inputs"
import Dropdown from "../../layout/Dropdown"

import { useEffect, useState } from "react"

const FormAddress = ({ handleSubmit, value, linkButton, buttonClickEvent }) => {
    const estados = [ "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
    "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO" ]

    const [address, setAddress] = useState({})

    useEffect(() => {
        if(value)
            setAddress(value)
    }, [value])
    
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
                        handleOnChange={ handleChange }
                        htmlFor="rua"
                        textLabel="Endereco"
                        required/>
                </div>

                <div className="cep">
                    <Input type="number"
                        name="cep"
                        id="cep"
                        handleOnChange={ handleChange }
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
                        handleOnChange={ handleChange }
                        htmlFor="bairro"
                        textLabel="Bairro"
                        required/>
                </div>

                <div className="cidade">
                    <Input type="text"
                        name="cidade"
                        id="cidade"
                        handleOnChange={ handleChange }
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
                        handleOnChange={ handleChange }/>
                </div>

                <div className="numero">
                    <Input type="number"
                        name="numero"
                        id="numero"
                        handleOnChange={ handleChange }
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
                    buttonSubmitEvent={ submit }
                >
                    Salvar Endereço
                </Button>
            </div>
        </form>
    )
}

export default FormAddress