import styles from './css_components/Tables.module.css'

import CollapseElement from './CollapseElement'
import InputComponentTable from './InputComponentTable'
import { useState } from 'react'

const TableIsumo = ({ itens, buttonClickEvent, categorias, filterDropdownParams, filterSearchParams }) => {
    const initialArray = []
    for(let i = 0; i < categorias.length; i++)
        initialArray.push(false)

    const [dropdown, setDropdown] = useState(initialArray)
    
    function dropdownConfig({ index }) {
        dropdown[index] = !dropdown[index]

        setDropdown(array => [...array])
    }

    function searchStatusInItems(supplies){
        if(filterDropdownParams != "")
            return supplies.filter(input => input.status == filterDropdownParams)
        else
            return supplies
    }

    function searchNameInItems(supplies){ 
        if(filterSearchParams != "")
            return supplies.filter(input => input.name.toLowerCase().includes(filterSearchParams.toLowerCase()))
        else 
            return supplies
    }

    function searchFilter(supplies) {
        let result = searchStatusInItems(supplies)
        return searchNameInItems(result)
    }

    function categoryFilter(categories){
        return categories.filter(category => {
            const foundItem = searchFilter(itens).find(item => item.name == category)

            if(foundItem)
                return category
        })
    }
    
    return(
        <>
            <div className={styles.table}>
                <div className='body-table'>
                    {
                        categoryFilter(categorias).map((categoria, index) =>
                            <CollapseElement isOpened={dropdown[index]} buttonClickEvent={() => dropdownConfig({ index: index })} text={categoria}>
                                <div className={styles.headerTable}>
                                    <em key="insumo">INSUMO</em>
                                    <em key="emEstoque">ESTOQUE</em>
                                    <em key="quantidadeMin">MÍNIMO</em>
                                    <em key="validade">VALIDADE</em>
                                    <em key="status">STATUS</em>
                                    <em>.</em>
                                </div>

                                { searchFilter(itens).map(item => 
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