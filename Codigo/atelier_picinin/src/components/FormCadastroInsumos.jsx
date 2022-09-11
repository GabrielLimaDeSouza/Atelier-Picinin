import styles from './css_components/Form.module.css'

import Input from "./Inputs"
import Button from "./Button"
import { useState } from "react"

const Form = ({ id, handleSubmit, content, btnText, classNameButton }) => {
    const date = new Date().toISOString().split('T')[0]

    if(content && content.validade)
        content.validade = content.validade.split('T')[0]
    
    function handleChange(e) {
        content[e.target.name] = e.target.value
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(content)
    }
        
    return (
        <form id={id && (id)} className={styles.form} onSubmit={submit}>
            <Input type="text"
                name="name"
                id="nome"
                htmlFor="nome"
                textLabel={"Nome:"}
                value={content && content.name}
                handleOnChange={handleChange}
                required
            />
            <Input type="number"
                name="emEstoque"
                id="quantidade_inicial"
                min="0"
                htmlFor="quantidade_inicial"
                textLabel={"Quantidade em estoque:"}
                value={content && content.emEstoque}
                handleOnChange={handleChange}
                required
            />
            <Input type="number"
                name="quantidadeMin"
                id="quantidade_minima"
                min="0"
                htmlFor="quantidade_minima"
                textLabel={"Quantidade Mínima:"}
                value={content && content.quantidadeMin}
                handleOnChange={handleChange}
                required
            />
            <Input type="date"
                name="validade"
                id="validade"
                htmlFor="validade"
                textLabel={"Validade:"}
                min={date}
                value={content && content.validade} 
                handleOnChange={handleChange}
            />
            <Button
                type="submit"
                className={classNameButton}
                buttonSubmitEvent={submit}>
                    
                {btnText}
            </Button>
        </form>
    )
}

export default Form