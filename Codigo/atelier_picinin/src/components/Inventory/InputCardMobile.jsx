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
                <em key={item.name}>{ primeiraLetraMaiuscula(item.name) }</em>
                <em key={statusStyle}><span className={status_styles[statusStyle]}>{ item.status }</span></em>
            </div>
            <div className={styles.infos}>
                <div className={styles.supplies_data}>
                    <em key={item.emEstoque}>Estoque: { item.emEstoque }</em>
                    <em key={item.quantidadeMin}>Mínimo: { item.quantidadeMin }</em>

                    { item.validade ? ( 
                        <em key={item.validade}>Validade: { new Date(item.validade).toLocaleDateString("pt-BR", {timeZone: 'UTC'}) }</em>
                    ) : ( 
                        <em key="SemValidade">Sem Validade</em> 
                    )}
                </div>

                <div className={styles.edit_data}>
                    <LinkButton to={`/estoque/${item._id}`}
                        type="button"
                        classNameButton="btnEdit"
                        state={ { categories: categories } }>
                        
                        <BiPencil />
                    </LinkButton>

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