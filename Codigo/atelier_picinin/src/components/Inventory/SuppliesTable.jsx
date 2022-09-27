//#region imports
import styles from '../css_components/layout/Tables.module.css'

import CollapseElement from '../layout/CollapseElement'
import InputComponentTable from './InputComponentTable'
import InputCardMobile from './InputCardMobile'
import { useEffect, useState } from 'react'
//#endregion

const TableIsumo = ({ itens, buttonClickEvent, categorias, filterDropdownParams, filterSearchParams }) => {
    //#region attr and configs
    const larguraTela = window.innerWidth

    const initialArray = []
    categorias.forEach(() => initialArray.push(false))

    const [itemFound, setItemFound] = useState(true)
    const [dropdown, setDropdown] = useState(initialArray)

    function dropdownConfig({ index }) {
        dropdown[index] = !dropdown[index]

        setDropdown(array => [...array])
    }
    //#endregion

    //#region hooks
    useEffect(() => {
        let result = itens.find(item => includeValues(item, ["name", "categoria"], filterSearchParams))

        if(result)
            setItemFound(true)
        else
            setItemFound(false)

    }, [[], filterSearchParams])
    //#endregion

    //#region aux functions
    function includeValues(object, arrayAttribute, value) {
        let count = 0
        arrayAttribute.forEach(attribute => {
            const inclueValue = object[attribute].toLowerCase().includes(value.toLowerCase())

            if(inclueValue)
                count++
        })

        return count
    }

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //#endregion

    //#region filter
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
        result = searchNameCategory(result)

        return result
    }

    function categoryFilter(categories) {
        return categories.filter(category => {
            const foundItem = searchFilter(itens).find(item => item.categoria == category)

            if(foundItem)
                return category
        })
    }
    //#endregion
    
    return (
        <>
            <div className={styles.table}>
                <div className='body-table'>
                    {
                        !itemFound ? <p>Nenhum item encontrado</p>
                        :
                        categoryFilter(categorias).map((categoria, index) => (
                            <CollapseElement isOpened={ dropdown[index] }
                                buttonClickEvent={() => dropdownConfig({ index: index })}
                                text={ primeiraLetraMaiuscula(categoria) }>

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
                                    .map(item => (
                                        categoria == item.categoria && (
                                            larguraTela  >= 700 ? 
                                                <InputComponentTable item={item} buttonClickEvent={buttonClickEvent} categories={categorias} />
                                            :
                                                <InputCardMobile item={item} buttonClickEvent={buttonClickEvent} categories={categorias} />
                                        )
                                    ))
                                }
                            </CollapseElement>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TableIsumo