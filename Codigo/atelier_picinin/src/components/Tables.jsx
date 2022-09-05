import styles from '../pages/css/css_components/Tables.module.css'

const Tables = ({ arrayHeader, itens, arrayProperties, textButton}) => {
    return(
        <>
            <table>
                <thead>
                    <tr>
                        {
                            arrayHeader.map(column => (
                                <th key={column}>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        itens.map(item => (
                            <tr id={item["_id"]} key={item["_id"]}>
                                <td>{item[arrayProperties[0]]}</td>
                                <td>Sabor</td>
                                <td>Preço</td>
                                <td>PEDIDO MÍNIMO</td>
                                {textButton && (
                                    <td>{textButton}</td>
                                )}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Tables