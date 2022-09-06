import Input from "./Inputs"
import Button from "./Button"

import styles from '../pages/css/css_components/Form.module.css'

const Form = ({ action, method, id, btnText, classNameButton}) => {
    const date = new Date();
    return (
        <form className={styles.form} action={action} method={method} id={id && (id)}>
            <Input type="text" name="nome" id="nome" htmlFor="nome" textLabel={"Nome:"}/>
            <Input type="number" name="quantidade_inicial" id="quantidade_inicial" min="0" htmlFor="quantidade_inicial" textLabel={"Quantidade Inicial:"}/>
            <Input type="number" name="quantidade_minima" id="quantidade_minima" min="0" htmlFor="quantidade_minima" textLabel={"Quantidade Mínima:"}/>
            <Input type="date" name="valiade" id="validade" htmlFor="validade" textLabel={"Validade:"} min={date}/>
            <Button type="submit" className={classNameButton} text={btnText}/>
        </form>
    )
}

export default Form