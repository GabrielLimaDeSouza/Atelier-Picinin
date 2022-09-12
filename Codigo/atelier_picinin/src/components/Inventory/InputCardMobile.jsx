import styles from '../css_components/InputCardMobile.module.css'
import status_styles from '../css_components/InputComponentTable.module.css'

import LinkButton from '../layout/LinkButton'
import Button from '../layout/Button'
import { BiTrash, BiPencil } from 'react-icons/bi'

const InputCardMobile = ({ item, buttonClickEvent, categories }) => {
    const statusStyle = item.status.replace(/\s/g, '').toLowerCase()

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div id={item._id} key={item._id} className={styles.card}>
            <div className={styles.headerCard}>
                <em>{ primeiraLetraMaiuscula(item.name) }</em>
                <em><span className={status_styles[statusStyle]}>{ item.status }</span></em>
            </div>
            <div className={styles.infos}>
                <div className={styles.supplies_data}>
                    <em>Estoque: { item.emEstoque }</em>
                    <em>Mínimo: { item.quantidadeMin }</em>

                    { item.validade ? ( 
                        <em>Validade: { new Date(item.validade).toLocaleDateString("pt-BR", {timeZone: 'UTC'}) }</em>
                    ) : ( 
                        <em>Sem Validade</em> 
                    )}
                </div>

                <div className={styles.edit_data}>
                    <LinkButton to={`/estoque/${item._id}`}
                        type="button"
                        text={<BiPencil />}
                        classNameButton="btnEdit"
                        state={ { categories: categories } }
                    />
                    <Button type="button"
                            className="btnTrash"
                            buttonClickEvent={buttonClickEvent}>
                        {<BiTrash />}
                    </Button>
                </div>
            </div>
        </div>
    ) 
}

export default InputCardMobile