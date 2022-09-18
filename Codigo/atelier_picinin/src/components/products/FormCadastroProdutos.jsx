import styles from '../css_components/Form.module.css'

import Input from "../layout/Inputs"
import Button from "../layout/Button"

const Form = ({ action, method, id, btnText, classNameButton, onClickEvent, content }) => {
    return (
        <form className={styles.form} action={action} method={method} id={id && (id)}>
            <Input type="text" name="nome" id="nome" htmlFor="nome" textLabel={"Nome do Produto:"} required />
            <Input type="text" name="descricao" id="descricao" htmlFor="descricao" textLabel={"Descrição do Produto:"} required />
            <Input type="text" name="sabor" id="sabor" htmlFor="sabor" textLabel={"Sabores:"} required />
            <Input type="number" name="preco" id="preco" min="0" htmlFor="preco" textLabel={"Preço:"} required />
            <Input htmlFor="pedidoMinimo" textLabel={"Pedido Mínimo:"} type="number" name="pedidoMinProduto" id="pedidoMinProduto" min="0" required />
            <Input htmlFor="foto1" textLabel={"Foto de capa:"} type="file" name="foto1" id="foto1"  />
            <Input htmlFor="foto2" textLabel={"Segunda foto:"} type="file" name="foto2" id="foto2"  />
            <Input htmlFor="foto3" textLabel={"Terceira foto:"} type="file" name="foto3" id="foto3"  />
            <Button type="submit" className={classNameButton} onClickEvent={onClickEvent && ( onClickEvent )}>
                {btnText}
            </Button>
        </form>
    )
}

export default Form