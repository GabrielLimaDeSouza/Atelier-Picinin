import styles from '../css_components/Form.module.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import Input from "../layout/Inputs"
import Button from "../layout/Button"
import InputBox from "./InputBox"

const Form = ({ action, method, id, btnText, classNameButton, onClickEvent, onSubmitEvent, onChangeEvent}) => {
    return (
        <form className={styles.form} action={action} method={method} id={id && (id) } onSubmit={onSubmitEvent}>
            <Input type="text" name="nome" id="nome" htmlFor="nome" textLabel={"Nome do Produto:"} required />
            <Input type="text" name="descricao" id="descricao" htmlFor="descricao" textLabel={"Descrição do Produto:"} required />
            
            <Input type="number" name="preco" id="preco" min="0" htmlFor="preco" textLabel={"Preço:"} required />
            <InputBox handleSaboresProduto={onChangeEvent}/>
            <Input htmlFor="pedidoMinimo" textLabel={"Pedido Mínimo:"} type="number" name="pedidoMinProduto" id="pedidoMinProduto" min="0" required />
            <Input type="text" name="foto1" id="foto1" htmlFor="foto1" textLabel={"Foto de capa:"} required />
            <Input type="text" name="foto2" id="foto2" htmlFor="foto2" textLabel={"Foto segundária:"} required />
            <Input type="text" name="foto3" id="foto3" htmlFor="foto3" textLabel={"Foto terciária:"} required />
            <label htmlFor="">Selecione as imagens do seu instagram</label>
            <div id='instas' className={styles.instas}>
            
            </div>
            <Button type="submit"  className={classNameButton}>
                {btnText}
            </Button>
        </form>
    )
}

export default Form