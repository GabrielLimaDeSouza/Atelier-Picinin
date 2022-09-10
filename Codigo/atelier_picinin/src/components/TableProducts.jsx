import Button from './Button'
import { BiTrash } from 'react-icons/bi'

const Table = ({ produtos, buttonEvent, clickEvent }) => {
    return (
        <>
            <table>
                <thead>
                    <th key="produto">PRODUTO</th>
                    <th key="sabor">SABOR</th>
                    <th key="preco">PREÇO</th>
                    <th key="pedido_min">PEDIDO MÍNIMO</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        produtos.map(produto =>
                            <tr id={produto._id} key={produto._id} onClick={clickEvent}>
                                <td>{produto.nomeProduto}</td>
                                <td>{produto.saborProduto}</td>
                                <td>{produto.precoProduto}</td>
                                <td>{produto.pedidoMinProduto}</td>
                                <td><Button type="button" className="btnLixeira" event={buttonEvent}>{<BiTrash />}</Button></td>
                            </tr>              
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table