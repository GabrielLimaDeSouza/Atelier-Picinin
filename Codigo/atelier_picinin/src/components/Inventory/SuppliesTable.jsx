import styles from '../css_components/layout/Tables.module.css'

import CollapseElement from '../layout/CollapseElement'
import InputComponentTable from './InputComponentTable'
import InputCardMobile from './InputCardMobile'
import { useState } from 'react'

const TableIsumo = ({ itens, buttonClickEvent, categorias, filterDropdownParams, filterSearchParams }) => {
    const larguraTela = window.innerWidth

    const initialArray = []
    for(let i = 0; i < categorias.length; i++)
        initialArray.push(false)

    const [dropdown, setDropdown] = useState(initialArray)

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function dropdownConfig({ index }) {
        dropdown[index] = !dropdown[index]

        setDropdown(array => [...array])
    }

    function includeValues(object, arrayAttribute, value) {
        let count = 0
        arrayAttribute.forEach(attribute => {
            const inclueValue = object[attribute].toLowerCase().includes(value.toLowerCase())

            if(inclueValue)
                count++
        })

        return count
    }

    function searchStatusInItems(supplies){
        if(filterDropdownParams != "")
            return supplies.filter(input => input.status == filterDropdownParams)
        else
            return supplies
    }

    function searchNameCategory(supplies){ 
        if(filterSearchParams != "")
            return supplies.filter(input => includeValues(input, ["name", "categoria"], filterSearchParams))
        else 
            return supplies
    }

    function searchFilter(supplies) {
        let result = searchStatusInItems(supplies)
        return searchNameCategory(result)
    }

    function categoryFilter(categories){
        return categories.filter(category => {
            const foundItem = searchFilter(itens).find(item => item.categoria == category)

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
                            <CollapseElement isOpened={dropdown[index]}
                                buttonClickEvent={() => dropdownConfig({ index: index })}
                                text={primeiraLetraMaiuscula(categoria)}>
                                { larguraTela  >= 700 &&
                                    <div className={styles.headerTable}>
                                        <em key="insumo">INSUMO</em>
                                        <div className={styles.infosWithoutName}>
                                            <em key="emEstoque">ESTOQUE</em>
                                            <em key="quantidadeMin">MÍNIMO</em>
                                            <em key="validade">VALIDADE</em>
                                            <em key="status">STATUS</em>
                                            <em>.</em>
                                        </div>
                                    </div>
                                } { 
                                    searchFilter(itens)
                                    .sort((a, b) => {
                                        if(a.name < b.name)
                                            return -1
                                        else
                                            return true
                                    })
                                    .map(item => 
                                        categoria == item.categoria && (
                                            larguraTela  >= 700 ? 
                                                <InputComponentTable item={item} buttonClickEvent={buttonClickEvent} categories={categorias} />
                                            :
                                                <InputCardMobile item={item} buttonClickEvent={buttonClickEvent} categories={categorias} />
                                        )
                                    )
                                }
                            </CollapseElement>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default TableIsumo