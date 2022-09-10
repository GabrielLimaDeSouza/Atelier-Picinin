import './css_components/Tables.module.css'
import { BiTrash, BiPencil } from 'react-icons/bi'
import LinkButton from './LinkButton'
import Button from './Button'


const TableIsumo = ({ itens, clickEvent, deleteInput }) => {
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th key="insumo">Insumo</th>
                        <th key="emEstoque">Em Estoque</th>
                        <th key="quantidadeMin">Quantidade Mínima</th>
                        <th key="validade">Validade</th>
                        <th key="status">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itens.map(item => (
                            <tr id={item["_id"]} key={item["_id"]} onClick={clickEvent} >
                                    <td>{ item["name"] }</td>
                                    <td>{ item["emEstoque"] }</td>
                                    <td>{ item["quantidadeMin"] }</td>
                                    { item["validade"] ? ( <td>{ new Date(item["validade"]).toLocaleDateString("pt-BR") }</td> ) : ( <td>-</td> ) }
                                    <td>{ item["status"] }</td>
                                    <td>{ 
                                        <div className="btnManipulate">
                                            <LinkButton to={`/estoque/${item["_id"]}`}
                                                type="button"
                                                text={<BiPencil />}
                                                classNameButton="btnEdit"
                                            />
                                            <Button type="button" text={<BiTrash />}
                                                    className="btnTrash"
                                                    onClickEvent={deleteInput}
                                            />
                                        </div>
                                    }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableIsumo