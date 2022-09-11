import styles from './css_components/Tables.module.css'

import CollapseElement from './CollapseElement'
import InputComponentTable from './InputComponentTable'
import { useState } from 'react'

const TableIsumo = ({ itens, buttonClickEvent, categorias, filterParams }) => {
    const initialArray = []
    for(let i = 0; i < categorias.length; i++)
        initialArray.push(false)

    const [dropdown, setDropdown] = useState(initialArray)
    
    function teste({ index }) {
        dropdown[index] = !dropdown[index]

        setDropdown(array => [...array])
    }

    function dropdownFilter(supplies) {
        return supplies.filter(input => {
            if (input.status == filterParams) {
                return input
            } else if (filterParams == "") {
                return input
            }
        })
    }

    function categoryFilter(categories){
        return categories.filter(category => {
            const foundItem = dropdownFilter(itens).find(item => item.name == category)
            if(foundItem)
                return category
            else if (filterParams == "")
                return category
        })
    }
    
    return(
        <>
            <div className={styles.table}>
                <div className='body-table'>
                    {
                        categoryFilter(categorias).map((categoria, index) =>
                            <CollapseElement isOpened={dropdown[index]} buttonClickEvent={() => teste({ index: index })} text={categoria}>
                                <div className={styles.headerTable}>
                                    <em key="insumo">Insumo</em>
                                    <em key="emEstoque">Em Estoque</em>
                                    <em key="quantidadeMin">Quantidade Mínima</em>
                                    <em key="validade">Validade</em>
                                    <em key="status">Status</em>
                                    <em>.</em>
                                </div>

                                { dropdownFilter(itens).map(item => 
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