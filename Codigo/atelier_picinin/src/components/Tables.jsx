const Tables = ({ arrayHeader, itens, textButton}) => {
    return(
        <>
            <table>
                <thead>
                    <tr>
                        {
                            arrayHeader.map(column => (
                                <th>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        itens.map(item => (
                            <tr id={item._id}>
                                <td>{item.nomeProduto}</td>
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