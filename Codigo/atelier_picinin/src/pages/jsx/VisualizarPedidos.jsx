
import '../css/visualizarPedidos/visualizarPedidos.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiTrash, BiPencil } from 'react-icons/bi'
const VisualizarPedidos = () => {
    var teste = [{
        usuario: "teste",
        dataDeEntrega: "20/01/2023",
        limiteDePagamento: "20/11/2022",
        status: "vencendo"
    },
    {
        usuario: "teste1",
        dataDeEntrega: "20/01/2023",
        limiteDePagamento: "20/12/2022",
        status: "pago"
    },
    {
        usuario: "teste2",
        dataDeEntrega: "20/01/2023",
        limiteDePagamento: "20/10/2022",
        status: "expirado"
    }
    ]
    var prioridade = []
    var expirado = []
    var vencendo = []
    var pago = []

    for (let i = 0; i < teste.length; i++) {
        if (teste[i].status == "expirado") {
            expirado.push(teste[i]);
        } else {
            if (teste[i].status == "vencendo") {
                vencendo.push(teste[i])
            }
            else {
                pago.push(teste[i])
            }
        }
    }



    prioridade.push(expirado)
    prioridade.push(vencendo)
    prioridade.push(pago)

    console.log(prioridade[0][0])
    return (
        <>
            <div className="divTabela">
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>CLIENTE</th>
                                <th>PEDIDO</th>
                                <th>DATA DE ENTREGA</th>
                                <th>LIMITE DE PAGAMENTO</th>
                                <th>STATUS</th>
                                <th>EXCLUIR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prioridade.map(element => (
                                <><tr>
                                    <td>{element[0].usuario}</td>
                                    <td><button className="carrinho"><AiOutlineShoppingCart/></button></td>
                                    <td>{element[0].dataDeEntrega}</td>
                                    <td>{element[0].limiteDePagamento}</td>
                                    <td>{
                                        element[0].status == "pago" ? <td><span className='_ok_3m2o5_87'>PAGO</span></td> : element[0].status == "vencendo" ? <td><span className='_vencendo_3m2o5_107'>VENCENDO</span></td> : <td><span className='_emfalta_3m2o5_67'>VENCIDO</span></td>
                                    }</td>
                                    <td><BiTrash /></td>
                                </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {prioridade.map(element => (
                            element.usuario
                        ))}
                    </div>
                </>
            </div>
        </>
    )
}

export default VisualizarPedidos