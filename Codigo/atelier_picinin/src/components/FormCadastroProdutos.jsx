import Input from "./Inputs"
import Button from "./Button"

import styles from '../pages/css/css_components/Form.module.css'

const Form = ({ action, method, id, btnText, classNameButton}) => {
    return (
        <form className={styles.form} action={action} method={method} id={id && (id)}>
            <Input type="text" name="nome" id="nome" htmlFor="nome" textLabel={"Nome do Produto:"}/>
            <Input type="text" name="descricao" id="descricao" htmlFor="descricao" textLabel={"Descrição do Produto:"}/>
            <Input type="text" name="sabores" id="sabores" htmlFor="sabores" textLabel={"Sabores:"}/>
            <Input type="number" name="preco" id="preco" min="0" htmlFor="preco" textLabel={"Preço:"}/>
            <Input htmlFor="pedidoMinimo" textLabel={"Pedido Mínimo:"} type="number" name="pedidoMinimo" id="pedidoMinimo" min="0" />
            <Input htmlFor="foto1" textLabel={"Foto de capa:"} type="file" name="foto1" id="foto1" />
            <Input htmlFor="foto2" textLabel={"Segunda foto:"} type="file" name="foto2" id="foto2" />
            <Input htmlFor="foto3" textLabel={"Terceira foto:"} type="file" name="foto3" id="foto3" />
            <Button type="submit" className={classNameButton} text={btnText}/>
        </form>
    )
}

export default Form