import Input from "./Inputs"
import Button from "./Button"

import styles from '../pages/css/css_components/Form.module.css'

const Form = ({ action, id, btnText, classNameButton, insumo, onSubmitEvent }) => {
    const date = new Date().toISOString().split('T')[0];
    return (
        <form className={styles.form} action={action} method="post" id={id && (id)}>
            <Input type="text" name="name" id="nome" htmlFor="nome" textLabel={"Nome:"} value={insumo && (insumo.name)} required={true} />
            <Input type="number" name="emEstoque" id="quantidade_inicial" min="0" htmlFor="quantidade_inicial" textLabel={"Quantidade Inicial:"} value={insumo && (insumo.emEstoque)} required={true}/>
            <Input type="number" name="quantidadeMin" id="quantidade_minima" min="0" htmlFor="quantidade_minima" textLabel={"Quantidade Mínima:"} value={insumo && (insumo.quantidadeMin)} required={true}/>
            <Input type="date" name="valiade" id="validade" htmlFor="validade" textLabel={"Validade:"} min={date} value={insumo && (insumo.valiade)} />
            <Button type="submit" className={classNameButton} text={btnText} onSubmitEvent={onSubmitEvent && (onSubmitEvent)}/>
        </form>
    )
}

export default Form