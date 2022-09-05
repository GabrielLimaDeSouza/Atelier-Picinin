import styles from '../pages/css/css_components/Tables.module.css'

const TableIsumo = ({ itens, textButton, data_bs_target, data_bs_toggle}) => {
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
                            <tr id={item["_id"]} key={item["_id"]}
                                data-bs-target={data_bs_target}
                                data-bs-toggle={data_bs_toggle}
                            >
                                    <td>{item["name"]}</td>
                                    <td>{item["emEstoque"]}</td>
                                    <td>{item["quantidadeMin"]}</td>
                                    { item["validade"] ? ( <td>{ new Date(item["validade"]).toLocaleDateString("pt-BR") }</td> ) : ( <td>-</td> ) }
                                    <td>{item["status"]}</td>
                                { textButton && ( <td>{textButton}</td> ) }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableIsumo