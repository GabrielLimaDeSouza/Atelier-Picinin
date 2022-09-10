import styles from './css_components/Form.module.css'

import Input from "./Inputs"
import Button from "./Button"
import { useState } from "react"

const Form = ({ id, handleSubmit, content, btnText, classNameButton }) => {
    const [insumo, setInsumo] = useState(content || {})
    const date = new Date().toISOString().split('T')[0]

    if(insumo.validade)
        insumo.validade = insumo.validade.split('T')[0]
    
    function handleChange(e) {
        setInsumo({ ...insumo, [e.target.name]: e.target.value })
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(insumo)
    }
        
    return (
        <form id={id && (id)} className={styles.form} onSubmit={submit} >
            <Input type="text"
                name="name"
                id="nome"
                htmlFor="nome"
                textLabel={"Nome:"}
                value={insumo.name}
                handleOnChange={handleChange}
                required={true}
            />
            <Input type="number"
                name="emEstoque"
                id="quantidade_inicial"
                min="0"
                htmlFor="quantidade_inicial"
                textLabel={"Quantidade Inicial:"}
                value={insumo.emEstoque}
                handleOnChange={handleChange}
                required={true}
            />
            <Input type="number"
                name="quantidadeMin"
                id="quantidade_minima"
                min="0"
                htmlFor="quantidade_minima"
                textLabel={"Quantidade Mínima:"}
                value={insumo.quantidadeMin}
                handleOnChange={handleChange}
                required={true}
            />
            <Input type="date"
                name="validade"
                id="validade"
                htmlFor="validade"
                textLabel={"Validade:"}
                min={date}
                value={insumo.validade} 
                handleOnChange={handleChange}
            />
            <Button
                type="submit"
                text={btnText}
                className={classNameButton}
                onSubmitEvent={submit}
            />
        </form>
    )
}

export default Form