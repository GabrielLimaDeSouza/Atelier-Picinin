import styles from './css_components/InputComponentTable.module.css'

import LinkButton from './LinkButton'
import Button from './Button'
import { BiTrash, BiPencil } from 'react-icons/bi'

const InputComponentTable = ({ item, buttonClickEvent }) => {
    return (
        <div id={item._id} key={item._id} className={styles.component}>
            <em>{ item.name }</em>
            <em>{ item.emEstoque }</em>
            <em>{ item.quantidadeMin }</em>

            { 
                item.validade ? ( 
                    <em>{ new Date(item.validade).toLocaleDateString("pt-BR", {timeZone: 'UTC'}) }</em>
                ) : ( 
                    <em>-</em> 
                )
            }

            <em>{ item.status }</em>

            <em>{ 
                <div className="btnManipulate">
                    <LinkButton to={`/estoque/${item._id}`}
                        type="button"
                        text={<BiPencil />}
                        classNameButton="btnEdit"
                    />
                    <Button type="button"
                            className="btnTrash"
                            buttonClickEvent={buttonClickEvent}>
                        {<BiTrash />}
                    </Button>
                </div>
            }</em>
        </div>
    )
}

export default InputComponentTable