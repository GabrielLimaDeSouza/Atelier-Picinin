import styles from '../pages/css/css_components/Form.module.css'

import Input from "./Inputs"
import Button from "./Button"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

const Form = ({ action, id, handleSubmit, content, btnText, classNameButton, onSubmitEvent, linkButton }) => {
    const [insumo, setInsumo] = useState({})
    const date = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if(content){
            setInsumo(content)
        }
    }, [])
    
    function handleChange(e) {
        setInsumo({ ...insumo, [e.target.name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(insumo)
    }
        
    return (
        <form onSubmit={submit} className={styles.form} action={action} method="post" id={id && (id)}>
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
                name="valiade"
                id="validade"
                htmlFor="validade"
                textLabel={"Validade:"}
                min={date}
                value={insumo.valiade} 
                handleOnChange={handleChange}
            />
            {/*<Link to={`/${linkButton}`}>*/}
                <Button type="submit"
                    className={classNameButton}
                    text={btnText}
                    onSubmitEvent={onSubmitEvent && (onSubmitEvent)}
                />
            {/*</Link>*/}
        </form>
    )
}

export default Form