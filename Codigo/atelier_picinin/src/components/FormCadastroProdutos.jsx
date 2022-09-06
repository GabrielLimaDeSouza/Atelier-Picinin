import Input from "./Inputs"
import Button from "./Button"

import styles from '../pages/css/css_components/Form.module.css'

const Form = ({ action, method, id, btnText, classNameButton, onClickEvent, content }) => {
    return (
        <form className={styles.form} action={action} method={method} id={id && (id)}>
            <Input type="text" name="nome" id="nome" htmlFor="nome" textLabel={"Nome do Produto:"} required={true} value={content.nomeProduto} />
            <Input type="text" name="descricao" id="descricao" htmlFor="descricao" textLabel={"Descrição do Produto:"} required={true} />
            <Input type="text" name="sabor" id="sabor" htmlFor="sabor" textLabel={"Sabores:"} required={true} />
            <Input type="number" name="preco" id="preco" min="0" htmlFor="preco" textLabel={"Preço:"} required={true} />
            <Input htmlFor="pedidoMinimo" textLabel={"Pedido Mínimo:"} type="number" name="pedidoMinProduto" id="pedidoMinProduto" min="0" required={true} />
            <Input htmlFor="foto1" textLabel={"Foto de capa:"} type="file" name="foto1" id="foto1" required={true} />
            <Input htmlFor="foto2" textLabel={"Segunda foto:"} type="file" name="foto2" id="foto2" required={true} />
            <Input htmlFor="foto3" textLabel={"Terceira foto:"} type="file" name="foto3" id="foto3" required={true} />
            <Button type="submit" className={classNameButton} text={btnText} onClickEvent={onClickEvent && ( onClickEvent )}/>
        </form>
    )
}

export default Form