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
                                {
                                    arrayProperties.map(property => (
                                        item[property] != null ? ( <td key={property}>{item[property]}</td> )
                                        : ( <td key={property}>-</td> )
                                    ))
                                } {
                                    textButton && (
                                        <td>{textButton}</td>
                                    )
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Tables