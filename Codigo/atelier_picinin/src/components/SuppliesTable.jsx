import styles from './css_components/Tables.module.css'

import LinkButton from './LinkButton'
import Button from './Button'
import CollapseElement from './CollapseElement'
import { BiTrash, BiPencil } from 'react-icons/bi'
import { useState, useEffect } from 'react'

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
                <div className='bodyTable'>
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
                                        <div id={item._id} key={item._id} className={styles.lineTable}>
                                            <em>{ item.name }</em>
                                            <em>{ item.emEstoque }</em>
                                            <em>{ item.quantidadeMin }</em>

                                            { 
                                                item.validade ? ( 
                                                    <em>{ new Date(item.validade).toLocaleDateString("pt-BR") }</em>
                                                ) : ( 
                                                    <em>-</em> 
                                                )
                                            }

                                            <em>{ item.status }</em>

                                            <em>{ 
                                                <div className="btnManipulate">
                                                    <LinkButton to={`/estoque/${item["_id"]}`}
                                                        type="button"
                                                        text={<BiPencil />}
                                                        classNameButton="btnEdit"
                                                    />
                                                    <Button type="button" text={<BiTrash />}
                                                            className="btnTrash"
                                                            buttonClickEvent={buttonClickEvent}
                                                    />
                                                </div>
                                            }</em>
                                        </div>
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