import '../pages/css/css_components/Tables.module.css'

const TableIsumo = ({ itens, textButton, clickEvent, idModal }) => {
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
                            <tr id={item["_id"]} key={item["_id"]} onClick={clickEvent} data-bs-toggle="modal" data-bs-target={idModal} >
                                    <td>{ item["name"] }</td>
                                    <td>{ item["emEstoque"] }</td>
                                    <td>{ item["quantidadeMin"] }</td>
                                    { item["validade"] ? ( <td>{ new Date(item["validade"]).toLocaleDateString("pt-BR") }</td> ) : ( <td>-</td> ) }
                                    <td>{ item["status"] }</td>
                                    <td>{ textButton }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableIsumo