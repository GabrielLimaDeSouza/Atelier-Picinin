import styles from './css_components/Tables.module.css'

import CollapseElement from './CollapseElement'
import InputComponentTable from './InputComponentTable'
import { useState } from 'react'

const TableIsumo = ({ itens, buttonClickEvent, categorias }) => {
    const initialArray = []
    for(let i = 0; i < categorias.length; i++)
        initialArray.push(false)

    const [dropdown, setDropdown] = useState(initialArray)
    
    function teste({ index }) {
        dropdown[index] = !dropdown[index]

        setDropdown(array => [...array])
    }
    
    return(
        <>
            <div className={styles.table}>
                <div className='body-table'>
                    {
                        categorias.map((categoria, index) =>
                            <CollapseElement isOpened={dropdown[index]} buttonClickEvent={() => teste({ index: index })} text={categoria}>
                                <div className={styles.headerTable}>
                                    <em key="insumo">Insumo</em>
                                    <em key="emEstoque">Em Estoque</em>
                                    <em key="quantidadeMin">Quantidade Mínima</em>
                                    <em key="validade">Validade</em>
                                    <em key="status">Status</em>
                                    <em>.</em>
                                </div>

                                { itens.map(item => 
                                    categoria == item.name && (
                                        <InputComponentTable item={item} buttonClickEvent={buttonClickEvent} />
                                    )
                                )}
                            </CollapseElement>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default TableIsumo