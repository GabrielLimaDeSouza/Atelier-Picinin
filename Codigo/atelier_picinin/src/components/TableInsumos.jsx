import '../pages/css/css_components/Tables.module.css'
import { BiTrash, BiPencil } from 'react-icons/bi'
import Button from './Button'
import { Link } from 'react-router-dom'

const TableIsumo = ({ itens, clickEvent, deleteInventory }) => {
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
                                            <Link to={`/estoque/${item["_id"]}`}>
                                                <Button type="button" text={<BiPencil />}
                                                        className="btnEdit"
                                                />
                                            </Link>
                                            <Button type="button" text={<BiTrash />}
                                                    className="btnTrash"
                                                    event={deleteInventory}
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