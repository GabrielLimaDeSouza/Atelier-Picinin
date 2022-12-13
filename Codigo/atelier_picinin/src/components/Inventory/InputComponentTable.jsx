import styles from '../css_components/InputComponentTable.module.css'

import LinkButton from '../layout/LinkButton'
import Button from '../layout/Button'
import { BiTrash, BiPencil } from 'react-icons/bi'

const InputComponentTable = ({ item, buttonClickEvent, categories }) => {
    const statusStyle = item.status.replace(/\s/g, '').toLowerCase()

    return (
        <div id={ item._id } key={ item._id } className={ styles.component }>
            <em>{ item.name }</em>
            <div className={ styles.infosWithoutName }>
                <em>{ item.emEstoque }</em>
                <em>{ item.quantidadeMin }</em>

                { 
                    item.validade ? ( 
                        <em>{ new Date(item.validade).toLocaleDateString("pt-BR", { timeZone: 'UTC' }) }</em>
                    ) : ( 
                        <em>-</em> 
                    )
                }

                <em><span className={ styles[statusStyle] }>{ item.status }</span></em>

                <em>{ 
                    <div className={ styles.btnManipulate }>
                        <LinkButton to={ `/adm/estoque/${item._id}` }
                            type="button"
                            classNameButton="btnEdit"
                            state={{ categories: categories }}>

                            <BiPencil />
                        </LinkButton>

                        <Button type="button"
                            id={ item._id }
                            className="btnTrash"
                            buttonClickEvent={ buttonClickEvent }>

                            <BiTrash />
                        </Button>
                    </div>
                }</em>
            </div>
        </div>
    )
}

export default InputComponentTable